<?php

namespace App\ParkingReservation\Controllers;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Domain\ParkingReservation\Models\ParkingReservation;
use Domain\ParkingReservation\Data\Resources\ParkingReservationResource;
use Domain\ShoppingCenter\Models\ShoppingCenter;
use Domain\ParkingSpot\Models\ParkingSpot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Notifications\ConfirmacionReservaParking;

class ParkingReservationController extends Controller
{
    const BASE_PRICE = 2.00;
    const MINUTES_PER_SLOT = 15;

    const MAX_ACTIVE_RESERVATIONS = 101;

    const RESERVATION_EXPIRATION_MINUTES = 15;

    public function index()
    {
        $user = Auth::user();
        $reservations = ParkingReservation::where('user_id', $user->id)
            ->orderByDesc('reserved_at')
            ->get();

        return ParkingReservationResource::collection($reservations);
    }

    public function store(Request $request)
{
    $user = Auth::user();
    


    $validated = $request->validate([
        'parking_spot_id' => 'required|uuid|exists:parking_spots,id',
        'shopping_center_id' => 'required|uuid|exists:shopping_centers,id',
        'start_date' => 'required|date|after_or_equal:now',
        'end_date' => 'required|date|after:start_date',
    ]);

    $reservedAt = Carbon::parse($validated['start_date'], config('app.timezone'));
    $reservedUntil = Carbon::parse($validated['end_date'], config('app.timezone'));

    $activeReservations = ParkingReservation::where('user_id', $user->id)
        ->where('is_confirmed', true)
        ->where('reserved_until', '>=', now())
        ->count();

    if ($activeReservations >= self::MAX_ACTIVE_RESERVATIONS) {
        return response()->json([
            'message' => 'Ya tienes una reserva activa. No puedes hacer más reservas.',
        ], 422);
    }

    $conflict = ParkingReservation::where('parking_spot_id', $validated['parking_spot_id'])
        ->where('is_confirmed', true)
        ->where(function ($q) use ($reservedAt, $reservedUntil) {
            $q->whereBetween('reserved_at', [$reservedAt, $reservedUntil])
              ->orWhereBetween('reserved_until', [$reservedAt, $reservedUntil])
              ->orWhere(function ($q2) use ($reservedAt, $reservedUntil) {
                  $q2->where('reserved_at', '<=', $reservedAt)
                     ->where('reserved_until', '>=', $reservedUntil);
              });
        })
        ->exists();

    if ($conflict) {
        return response()->json([
            'message' => 'La plaza ya está reservada durante ese período.',
        ], 422);
    }

    $reservation = ParkingReservation::create([
        'id' => (string) Str::uuid(),
        'user_id' => $user->id,
        'parking_spot_id' => $validated['parking_spot_id'],
        'shopping_center_id' => $validated['shopping_center_id'],
        'reserved_at' => $reservedAt,
        'reserved_until' => $reservedUntil,
        'date' => $reservedAt->toDateString(),
        'start_time' => $reservedAt->toTimeString(),
        'end_time' => $reservedUntil->toTimeString(),
        'is_confirmed' => true, // ⬅️ confirmamos directamente
    ]);

    $reservation->load('parkingSpot.zone.floor', 'shoppingCenter');


    // ⬇️ ENVÍO DEL EMAIL AQUÍ MISMO
    $centroreserva= ShoppingCenter::find($reservation->shopping_center_id)->name;
    
    $plazareserva = ParkingSpot::find($reservation->parking_spot_id)->spot_number;

    $user->notify(new ConfirmacionReservaParking([

    'centro_comercial' => $reservation->shoppingCenter->name ?? 'N/A',
    'zona' => $reservation->parkingSpot->zone->name ?? 'N/A',
    'piso' => $reservation->parkingSpot->zone->floor->level ?? 'N/A',
    'fecha_inicio' => $reservation->reserved_at->format('Y-m-d'),
    'hora_inicio' => $reservation->reserved_at->format('H:i'),
    'fecha_fin' => $reservation->reserved_until->format('Y-m-d'),
    'hora_fin' => $reservation->reserved_until->format('H:i'),
]));


    $price = $this->calculateReservationPrice($reservedAt, $reservedUntil);

    return response()->json([
        'message' => 'Reserva creada y confirmada.',
        'reservation' => new ParkingReservationResource($reservation),
        'price' => $price,
        'expires_at' => now()->addMinutes(self::RESERVATION_EXPIRATION_MINUTES)->toDateTimeString(),
    ], 201);
}


    public function confirm(Request $request, $id)
    {
        $reservation = ParkingReservation::with(['user', 'parkingSpot', 'shoppingCenter'])
                            ->findOrFail($id);

        // Verificar si ya está confirmada
        if ($reservation->is_confirmed) {
            return response()->json([
                'message' => 'La reserva ya está confirmada'
            ], 400);
        }

        // Actualizar el estado de confirmación
        $reservation->update([
            'is_confirmed' => true,
            'confirmed_at' => now()
        ]);

        // Preparar datos para la notificación
        $datosNotificacion = [
            'centro_comercial' => $reservation->shoppingCenter->name,
            'zona' => $reservation->parkingSpot->zone,
            'piso' => $reservation->parkingSpot->floor,
            'fecha_inicio' => $reservation->date->format('d/m/Y'),
            'hora_inicio' => $reservation->start_time,
            'fecha_fin' => $reservation->date->format('d/m/Y'), // o usa reserved_until si es diferente
            'hora_fin' => $reservation->end_time,
            'plaza' => $reservation->parkingSpot->code
        ];

        // Enviar notificación
        $reservation->user->notify(
            (new ConfirmacionReservaParking($datosNotificacion))->delay(now()->addSeconds(5))
        );

        return response()->json([
            'message' => 'Reserva confirmada exitosamente',
            'data' => $reservation->fresh()
        ]);
    }

    public function cancel($id)
    {
        $user = Auth::user();
        $reservation = ParkingReservation::findOrFail($id);

        if ($reservation->user_id !== $user->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        if (Carbon::parse($reservation->reserved_at)->isPast()) {
            return response()->json(['message' => 'No se puede cancelar una reserva pasada'], 422);
        }

        $reservation->delete();

        return response()->json(['message' => 'Reserva cancelada con éxito']);
    }

    public function history()
    {
        $user = Auth::user();
        $reservations = ParkingReservation::where('user_id', $user->id)
            ->where('reserved_until', '<', now())
            ->orderByDesc('reserved_at')
            ->get();

        return ParkingReservationResource::collection($reservations);
    }

    private function calculateReservationPrice(Carbon $from, Carbon $to)
    {
        $hours = $from->diffInMinutes($to) / 60;
        $hoursRounded = ceil($hours);
        return round($hoursRounded * self::BASE_PRICE, 2);
    }

    public function checkAvailability(Request $request)
    {
        $validated = $request->validate([
            'parking_spot_id' => 'required|uuid|exists:parking_spots,id',
            'start_date' => 'required|date|after_or_equal:now',
            'end_date' => 'required|date|after:start_date',
        ]);

        $reservedAt = Carbon::parse($validated['start_date']);
        $reservedUntil = Carbon::parse($validated['end_date']);

        $conflict = ParkingReservation::where('parking_spot_id', $validated['parking_spot_id'])
            ->where('is_confirmed', true)
            ->where(function ($q) use ($reservedAt, $reservedUntil) {
                $q->whereBetween('reserved_at', [$reservedAt, $reservedUntil])
                  ->orWhereBetween('reserved_until', [$reservedAt, $reservedUntil])
                  ->orWhere(function ($q2) use ($reservedAt, $reservedUntil) {
                      $q2->where('reserved_at', '<=', $reservedAt)
                         ->where('reserved_until', '>=', $reservedUntil);
                  });
            })
            ->exists();

        return response()->json([
            'available' => !$conflict,
            'price' => $this->calculateReservationPrice($reservedAt, $reservedUntil),
        ]);
    }

    public function show(string $id)
{
    $user = Auth::user();

    $reservation = ParkingReservation::with(['parkingSpot.floor', 'shoppingCenter'])
        ->where('id', $id)
        ->where('user_id', $user->id)
        ->firstOrFail();

    return inertia('Reservations/Show', [
        'reservation' => [
            'id' => $reservation->id,
            'centro_comercial' => $reservation->shoppingCenter->name,
            'zona' => $reservation->parkingSpot->floor->zone,
            'piso' => $reservation->parkingSpot->floor->level,
            'fecha_inicio' => $reservation->reserved_at->format('Y-m-d'),
            'hora_inicio' => $reservation->reserved_at->format('H:i'),
            'fecha_fin' => $reservation->reserved_until->format('Y-m-d'),
            'hora_fin' => $reservation->reserved_until->format('H:i'),
        ],
    ]);
}


    public function destroy($id)
    {
        try {
            $reservation = ParkingReservation::where('id', $id)->firstOrFail();
            
            // Verificar autorización
            if (auth()->id() !== $reservation->user_id) {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 403);
            }

            $reservation->delete();

            return response()->noContent(); // HTTP 204
        } catch (\Exception $e) {
            Log::error("Error deleting parking reservation: " . $e->getMessage());
            
            return response()->json([
                'message' => 'Error deleting reservation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}

