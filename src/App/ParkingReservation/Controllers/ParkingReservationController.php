<?php

namespace App\ParkingReservation\Controllers;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Domain\ParkingReservation\Models\ParkingReservation;
use Domain\ParkingReservation\Data\Resources\ParkingReservationResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ParkingReservationController extends Controller
{
    const BASE_PRICE = 2.00;
    const MINUTES_PER_SLOT = 15;
    const MAX_ACTIVE_RESERVATIONS = 1;
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
            'is_confirmed' => false,
        ]);

        $price = $this->calculateReservationPrice($reservedAt, $reservedUntil);

        return response()->json([
            'message' => 'Reserva creada. Por favor, confirma el pago.',
            'reservation' => new ParkingReservationResource($reservation),
            'price' => $price,
            'expires_at' => now()->addMinutes(self::RESERVATION_EXPIRATION_MINUTES)->toDateTimeString(),
        ], 201);
    }

    public function confirm($id)
    {
        $user = Auth::user();
        $reservation = ParkingReservation::findOrFail($id);

        if ($reservation->user_id !== $user->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        if (Carbon::parse($reservation->created_at)->addMinutes(self::RESERVATION_EXPIRATION_MINUTES)->isPast()) {
            $reservation->delete();
            return response()->json(['message' => 'La reserva ha expirado'], 410);
        }

        $reservation->update(['is_confirmed' => true]);

        return response()->json([
            'message' => 'Reserva confirmada con éxito',
            'reservation' => new ParkingReservationResource($reservation),
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
}
