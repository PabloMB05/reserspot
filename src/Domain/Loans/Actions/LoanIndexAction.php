<?php

namespace Domain\Loans\Actions;

use Domain\Books\Models\Book;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;

class LoanIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $email = $search[0];
        $title = $search[1];
        $status = $search[2];
        $startDate = $search[3];
        $dueDate = $search[4];

        $users = User::query()
        ->when($email !== "null", function ($query) use ($email) {
            $query->where('email', 'ILIKE', '%'.$email.'%')->withTrashed();
        })->pluck('id');

        $books = Book::query()
        ->when($title !== 'null', function ($query) use ($title) {
            $query->where('title', 'ILIKE', '%'.$title.'%');
        })->pluck('id');

        $loan = Loan::query()
            ->when($email !== "null" && $users!==null, function ($query) use ($users) {
                $query->whereIn('user_id', $users);
            })
            ->when($title !== "null", function ($query) use ($books) {
                $query->whereIn('book_id', $books);
            })
            ->when($status !== "null", function ($query) use ($status) {
                $query->where('is_active', 'like', $status);
            })
            ->when($startDate !== 'null', function ($query) use ($startDate) {
                $query->whereDate('created_at', '=', $startDate);
            })
            ->when($dueDate !== 'null', function ($query) use ($dueDate) {
                $query->whereDate('due_date', '=', $dueDate);
            })
            ->latest()
            ->paginate($perPage);

        return $loan->through(fn($loan) => LoanResource::fromModel($loan));
    }
}