<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use carbon\Carbon;
class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        
        $updateData = null;
        if(isset($data['due_date'])){
            $updateData = [
                'due_date' => $data['due_date'],
            ];
        }
        if(isset($data['new_is_active'])){
            $updateData = [
                'return_date' =>  Carbon::now()->format('Y-m-d'),
                'is_active' => false,
            ];
        }
        $loan->update($updateData);

        return LoanResource::fromModel($loan->fresh());
    }
}
