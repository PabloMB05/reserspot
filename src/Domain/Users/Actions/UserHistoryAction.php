<?php

namespace Domain\Users\Actions;

use App\Core\Controllers\Controller;
use App\Settings\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Models\Reservation;
use Carbon\carbon;

class UserHistoryAction extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function __invoke(User $user)
    {
        $loans = Loan::where('user_id', $user->id)
        ->withTrashed()
        ->with('book')
        ->orderBy('created_at')
        ->get()
        ->map(function ($loan) {
            $loan->expedit = $loan->created_at 
                ? Carbon::parse($loan->created_at)->format('d-m-Y') 
                : null;
    
            $loan->return = $loan->returned_at 
                ? Carbon::parse($loan->returned_at)->format('d-m-Y') 
                : null;
    
                $loan->end_due = ($loan->created_at && $loan->returned_at)
                ? (function () use ($loan) {
                    $start = Carbon::parse($loan->created_at);
                    $end = Carbon::parse($loan->returned_at);
                    $diff = $start->diff($end);

                    $parts = [];
                    if ($diff->d > 0) {
                        $parts[] = $diff->d . ' ' . trans_choice('ui.records.info.days', $diff->d);
                    }
                    if ($diff->h > 0) {
                        $parts[] = $diff->h . ' ' . trans_choice('ui.records.info.hours', $diff->h);
                    }
                    if ($diff->i > 0) {
                        $parts[] = $diff->i . ' ' . trans_choice('ui.records.info.minutes', $diff->i);
                    }

                    return implode(' y ', $parts);
                })()
                : null;


            
    
            $dueDate = $loan->due_date ? Carbon::parse($loan->due_date) : null;
            $now = Carbon::now();
    
            if ($dueDate) {
                $diffInHours = $now->diffInHours($dueDate, false); 
                $loan->remaining_days = floor($diffInHours / 24);
                $loan->remaining_hours = $diffInHours % 24;
                $loan->is_overdue = $diffInHours < 0;
            } else {
                $loan->remaining_days = null;
                $loan->remaining_hours = null;
                $loan->is_overdue = false;
            }
        
            return $loan;
        })
        ->toArray();
        
        $reservations = Reservation::where('user_id', $user->id)
        ->withTrashed()
        ->with('book')
        ->orderBy('created_at')
        ->get()
        ->map(function ($reservation) {
            $reservation->expedit = $reservation->created_at 
                ? Carbon::parse($reservation->created_at)->format('d-m-Y') 
                : null;
            return $reservation;
        })->toArray();
        $arrays = [];
        if(empty($reservation)){
            $reservation = null;
        }
        else if(empty($loans)){
            $loans = null;
        }
        array_push( $arrays, $loans, $reservations);
        return $arrays;
    }

}
