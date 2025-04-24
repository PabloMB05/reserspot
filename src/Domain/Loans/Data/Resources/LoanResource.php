<?php

namespace Domain\Loans\Data\Resources;

use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;
use Spatie\LaravelData\Data;
use Carbon\Carbon;

class LoanResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly int $user_id,
        public readonly string $user_email,
        public readonly int $book_id,
        public readonly string $book_title,
        public readonly string|null $return_date,
        public readonly string $due_date,
        public readonly string $days_between, // ← CAMBIADO A STRING
        public readonly bool $is_active,
        public readonly bool $is_late,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {}


    public static function fromModel(Loan $loan): self
    {
        // Obtener los detalles del usuario
        $user = User::find($loan->user_id);
        $user_email = $user ? $user->email : 'Unknown';
    
        // Obtener los detalles del libro
        $book = Book::find($loan->book_id);
        $book_title = $book ? $book->title : 'Unknown';
    
        // Manejo de fechas con Carbon
        $due_date_carbon = Carbon::parse($loan->due_date);
        $due_date = $due_date_carbon->format('Y-m-d');
    
        $return_date = $loan->return_date;
    
        $created_at = ($loan->created_at instanceof Carbon) ? $loan->created_at->format('Y-m-d') : $loan->created_at;
        $updated_at = ($loan->updated_at instanceof Carbon) ? $loan->updated_at->format('Y-m-d') : $loan->updated_at;
    
        // Cálculo de días entre hoy y la fecha de vencimiento
        $today = Carbon::now();
    
        if ($today->lt($due_date_carbon)) {
            $days = (int) $today->diffInDays($due_date_carbon);
            $days_between = 'Días restantes: ' . $days;
        } elseif ($today->gt($due_date_carbon)) {
            $days = (int) $due_date_carbon->diffInDays($today);
            $days_between = 'Días de retraso: ' . $days;
        } else {
            $days_between = 'Es el día límite';
        }
        
        
    
        return new self(
            id: (string)$loan->id,
            user_id: (int)$loan->user_id,
            user_email: $user_email,
            book_id: (int)$loan->book_id,
            book_title: $book_title,
            return_date: $return_date,
            due_date: $due_date,
            days_between: $days_between,
            is_active: $loan->is_active,
            is_late: $loan->is_late,
            created_at: (string)$created_at,
            updated_at: (string)$updated_at,
        );
    }
}    
