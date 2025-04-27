<?php

namespace Domain\Loans\Data\Resources;

use Carbon\Carbon;
use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Spatie\LaravelData\Data;

class LoanResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $user_id,
        public readonly string $book_id,
        public readonly string $title,
        public readonly string $email,
        public readonly bool $is_active,
        public readonly string $created_at,
        public readonly int $hours_between,
        public readonly int $hoursDue_between,
        public readonly string $due_date,
        public readonly string $returned_at, // not null//
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Loan $loan): self
    {
        $emailUser = User::withTrashed()->where('id', '=', $loan->user_id)->first()->email;
        $bookTitle = Book::withTrashed()->find($loan->book_id)->title;

        $retorno = 'Loading...';
        if ($loan->returned_at !== null) {
            $retorno = $loan->returned_at->format('d/m/Y');
        }
        $hoursD = 0;
        if ($loan->returned_at !== null) {
            $hoursD = $loan->returned_at->diffInHours($loan->due_date);
        }

        return new self(
            id: $loan->id,
            user_id: $loan->user_id,
            book_id: $loan->book_id,
            email: $emailUser,
            is_active: $loan->is_active,
            title: $bookTitle,
            created_at: $loan->created_at->format('d/m/Y'),
            hours_between: Carbon::now()->diffInHours($loan->due_date)+24,
            hoursDue_between: $hoursD,
            updated_at: $loan->updated_at,
            returned_at: $retorno,
            due_date: $loan->due_date->format('d/m/Y'),

        );
    }
}