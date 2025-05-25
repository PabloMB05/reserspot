<?php

namespace App\Parking\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ShoppingCenter;

class ParkingApiController extends Controller
{
    public function show($shoppingCenterId)
    {
        $shoppingCenter = ShoppingCenter::with('floors.zones.parkingSpots')->findOrFail($shoppingCenterId);
        return response()->json($shoppingCenter);
    }

    public function reserve(Request $request)
    {
        // Validación básica
        $validated = $request->validate([
            'parking_spot_id' => 'required|exists:parking_spots,id',
            'date' => 'required|date',
            'time' => 'required',
        ]);

        // Aquí podrías verificar si ya está ocupada en ese horario, etc.

        // Marcar como ocupada (simplificado)
        $spot = \App\Models\ParkingSpot::findOrFail($validated['parking_spot_id']);
        $spot->is_occupied = true;
        $spot->save();

        return response()->json(['message' => 'Reserva realizada con éxito']);
    }
}
