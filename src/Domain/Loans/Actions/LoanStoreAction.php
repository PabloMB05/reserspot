<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;

class LoanStoreAction
{
    public function __invoke(array $data): LoanResource
    {
        // Crear nuevo préstamo
        $loan = Loan::create([
            'user_id' => $data['user_id'],
            'book_id' => $data['book_id'],
            'due_date' => $data['due_date'],
            'is_active' => $data['is_active'] ?? true, // Valor por defecto si no se pasa
            'is_late' => $data['is_late'] ?? false,    // Valor por defecto si no se pasa
        ]);

        return LoanResource::fromModel($loan);
    }
}
