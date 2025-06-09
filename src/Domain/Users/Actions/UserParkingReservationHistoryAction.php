<?php

namespace Domain\Users\Actions;

use Domain\Users\Models\User;
use Domain\ParkingReservation\Models\ParkingReservation;

class UserParkingReservationHistoryAction
{
    public function __invoke(User $user): array
    {
        $reservations = ParkingReservation::withTrashed()
            ->with([
                'parkingSpot.zone.floor',
                'shoppingCenter'
            ])
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get();

        return $reservations->map(function ($reservation) {
            $spot = $reservation->parkingSpot;
            $zone = $spot?->zone;
            $floor = $zone?->floor;

            return [
                'id' => $reservation->id,
                'parkingSpot' => $spot?->spot_number ?? 'N/A',
                'zone' => $zone?->name ?? 'N/A',
                'floor' => $floor?->name ?? 'N/A',
                'shoppingCenter' => $reservation->shoppingCenter?->name ?? 'N/A',
                'reservationDate' => optional($reservation->reserved_at)->format('Y-m-d'),
                'expedit' => optional($reservation->reserved_at)->toDateTimeString(),
                'canceled_at' => optional($reservation->deleted_at)?->format('Y-m-d H:i:s'),
                'isCanceled' => $reservation->trashed(),
                'type' => 'parking_reservation',
            ];
        })->toArray();
    }
}
