<?php

namespace Domain\Reservations\Actions;

use Domain\Books\Models\Book;
use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;

class ReservationIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {

        $book = $search[0];
        $user = $search[1];
        $queue = $search[2];
        $startDate = $search[3];

        $selectedReservationIds = '';

        if($queue!=='null'){
            $reservations = Reservation::orderBy('created_at', 'desc')
                ->get()
                ->groupBy('book_id');

            $targetIndex = $queue-1;

            $selectedReservationIds = $reservations->map(function ($group) use ($targetIndex) {
                return optional($group->get($targetIndex))->id;
            })->filter()->values();

        }


        $book_ids = Book::query()
            ->when($book != 'null', function ($query) use ($book) {
                $query->where('title', 'ILIKE', '%' . $book . '%');
            })->pluck('id');

        $user_ids = User::query()
            ->when($user != 'null', function ($query) use ($user) {
                $query->where('email', 'ILIKE', '%' . $user . '%');
            })->pluck('id');

        $reservation = Reservation::query()
            ->when($book_ids != null, function ($query) use ($book_ids) {
                $query->whereIn('book_id', $book_ids);
            })
            ->when($book_ids != null, function ($query) use ($user_ids) {
                $query->whereIn('user_id', $user_ids);
            })
            ->when($startDate !== 'null', function ($query) use ($startDate) {
                $query->whereDate('created_at', '=', $startDate);
            })
            ->when($queue !== 'null', function ($query) use ($selectedReservationIds) {
                $query->whereIn('id', $selectedReservationIds);
            })
            ->latest()
            ->paginate($perPage);

        return $reservation->through(fn($loan) => ReservationResource::fromModel($loan));
    }
} 