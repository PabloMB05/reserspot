<?php

namespace App\Loans\Controllers;

use App\Core\Controllers\Controller;
use Carbon\Carbon;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';

        return Inertia::render('loans/Index', ['lang' => $lang]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $email_list = User::all()->pluck('email');
        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';
        return Inertia::render('loans/Create', ['lang'=>$lang, 'emailList' => $email_list]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, LoanStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'book' => ['required', 'string'],
            'user' => ['required', 'string'],
            'dueDate' => ['required'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('loans.index')
            ->with('success', __('Loan created sucefully'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Loan $loan)
    {
        $email_list = User::all()->pluck('email');
        $usermail = $loan->user->email;
        $bookUUID = $loan->book->id;
        $ddate = $loan->due_date->toISOString();

        // dd($usermail);

        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';

        // dd($loan);
        return Inertia::render('loans/Edit', [
            'loan' => $loan,
            'usermail' => $usermail,
            'bookUUID' => $bookUUID,
            'ddate' => $ddate,
            'emailList' => $email_list,
            'lang' => $lang,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Loan $loan, LoanUpdateAction $action)
    {

        if(isset($request['dueDate'])){
            $request['newDueDate'] = Carbon::parse($request['dueDate'])->format('d/m/Y, H:i:s');
        } else {
            $request['newDueDate'] = $request['newDueDate'];

        }

        $validator = Validator::make($request->all(), [
            'newStatus' => [],
            'newDueDate' => [],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($loan, $validator->validated());

        $redirectUrl = route('loans.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.loans.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}