<?php
namespace Domain\ParkingReservation\Actions;

use Domain\ParkingReservation\Models\ParkingReservation;
use Illuminate\Support\Str;

class ParkingReservationStoreAction
{
    public function __invoke(array $data): ParkingReservation
    {
        $data['id'] = (string) Str::uuid();

        // Crear la reserva con los campos correctos: date y time en vez de reserved_at
        return ParkingReservation::create([
            'id' => $data['id'],
            'user_id' => $data['user_id'],
            'parking_spot_id' => $data['parking_spot_id'],
            'shopping_center_id' => $data['shopping_center_id'],
            'date' => $data['date'],
            'time' => $data['time'],
            'is_confirmed' => $data['is_confirmed'] ?? false,
        ]);
    }
}