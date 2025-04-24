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
        // dd($user_id);

        $reservation = Reservation::create([
            'book_id' => $data['bookID'],  // Must secure unique in validations!!!
            'user_id' => $user_id,
        ]);

        return ReservationResource::fromModel($reservation);
    }
}