<?php

namespace Domain\Reservations\Actions;

use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;

class ReservationStoreAction
{
    public function __invoke(array $data): ReservationResource
    {
        $user_id = User::where('email', 'like', $data['userMail'])->first()->id;
        $reservation = Reservation::create([
            'book_id' => $data['bookID'],  
            'user_id' => $user_id,
        ]);

        return ReservationResource::fromModel($reservation);
    }
}