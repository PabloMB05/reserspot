<?php

namespace Domain\Reservations\Data\Resources;

use Domain\Loans\Models\Loan;
use Domain\Reservations\Models\Reservation;
use Spatie\LaravelData\Data;

use function PHPSTORM_META\map;

class ReservationResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $user_id,
        public readonly string $book_id,
        public readonly string $user_mail,
        public readonly string $book_title,
        public readonly int $puesto,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {}

    public static function fromModel(Reservation $reservation): self
    {
        $reservas_libro = Reservation::where('book_id', $reservation->book_id)
            ->orderBy('created_at', 'asc')
            ->get();

        $index = $reservas_libro->search(function ($reserva) use ($reservation) {
            return $reserva->user_id === $reservation->user_id;
        });

        return new self(

            id: $reservation->id,
            user_id: $reservation->user_id,
            book_id: $reservation->book_id,
            book_title: $reservation->book->title,
            user_mail: $reservation->user->email,
            puesto: $index + 1,
            created_at: $reservation->created_at,
            updated_at: $reservation->updated_at,
        );
    }
}