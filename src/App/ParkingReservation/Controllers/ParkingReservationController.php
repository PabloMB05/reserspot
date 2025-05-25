<?php
namespace App\ParkingReservation\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Domain\ParkingReservation\Actions\ParkingReservationStoreAction;
use Domain\ParkingReservation\Models\ParkingReservation; // Modelo correcto

lass ParkingReservationController extends Controller
{
    public function store(Request $request)
    {
        // Validar entrada
        $validator = Validator::make($request->all(), [
            'parking_spot_id' => 'required|string',
            'shopping_center_id' => 'required|string',
            'date' => 'required|date_format:Y-m-d',
            'time' => 'required|date_format:H:i:s',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Datos inválidos',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Aquí agregar lógica para crear la reserva en BD
        // Ejemplo ficticio:
        // $reservation = ParkingReservation::create($request->all());

        // Respuesta exitosa
        return response()->json([
            'message' => 'Reserva creada correctamente',
            //'reservation' => $reservation,
        ], 201);
    }
}
