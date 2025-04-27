<?php

namespace Domain\Loans\Actions;

use App\Notifications\confirmacion_reserva;
use Carbon\Carbon;
use Domain\Books\Models\Book;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;

class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {


        $statusCheck = $loan->is_active;
        if (isset($data['newStatus'])) {
            $statusCheck = $data['newStatus'];
            if (Reservation::where('book_id', 'like', $loan->book_id)->first() !== null){
            $user_id_res = Reservation::where('book_id', 'like', $loan->book_id)->orderBy('created_at', 'asc')->first()->user_id;
            $user = User::find($user_id_res);
            $librito = Book::find($loan->book_id);
            $user->notify(new confirmacion_reserva($librito));
            Reservation::where('user_id', '=', $user_id_res)->where('book_id', '=', $loan->book_id)->first()->delete();
        }}

        $returnDateCheck = $loan->returned_at ? $loan->returned_at : null;
        if (isset($data['newStatus'])) {
            $returnDateCheck = Carbon::now();
        }


        $dueDateCheck = $loan->due_date;

        if (isset($data['newDueDate'])) {

            $dueDateCheck = Carbon::createFromFormat('d/m/Y, H:i:s',  $data['newDueDate']);

        }
        if (isset($data['dueDate'])) {
            $dueDateCheck = $data['dueDate'];
        }


        $updateData = [
            'is_active' => $statusCheck, //must secure unique in validations!!!
            'due_date' => $dueDateCheck, //must secure unique in validations!!!
            'returned_at' => $returnDateCheck, //manejar para edicion
        ];


        $loan->update($updateData);

        return LoanResource::fromModel($loan->fresh());
    }
}