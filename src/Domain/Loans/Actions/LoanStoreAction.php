<?php

namespace Domain\Loans\Actions;

use Carbon\Carbon;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;

class LoanStoreAction
{
    public function __invoke(array $data): LoanResource
    {
        $user = User::where('email', 'like', $data['    '])->first()->id;

        $loan = Loan::create([
            'book_id' => $data['book'],  // Must secure unique in validations!!!
            'user_id' => $user,
            'due_date' => $data['dueDate'],
            'is_active' => true,
        ]);

        return LoanResource::fromModel($loan);
    }
}