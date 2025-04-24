<?php

namespace App\Loans\Controllers;

use App\Core\Controllers\Controller;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Models\Loan;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Domain\Models\floors\Floor;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
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
        return Inertia::render('loans/Index');
    }

    /**
     * Show the form for creating a new loan.
     */
    public function create()
    {
        $books = Book::select('id', 'title')->orderBy('title', 'asc')->get()->toArray();
        $users = User::select('id', 'name')->orderBy('name', 'asc')->get()->toArray();
        $zones = Zone::select('id', 'number', 'genre_name', 'floor_id')->orderBy('genre_name', 'asc')->get()->toArray();
        
        return Inertia::render('loans/Create', ['books' => $books, 'users' => $users, 'zones' => $zones]);
    }

    /**
     * Store a newly created loan in storage.
     */
    public function store(Request $request, LoanStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => ['required',  'exists:books,id'],
            'user_id' => ['required',  'exists:users,id'],
            'due_date' => ['required', 'date'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());
        
        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.created'));
    }

    /**
     * Show the form for editing the specified loan.
     */
    public function edit(Request $request, Loan $loan)
    {
        // Obtener los libros, usuarios y zonas
        $books = Book::select('id', 'title')->orderBy('title', 'asc')->get()->toArray();
        $users = User::select('id', 'name')->orderBy('name', 'asc')->get()->toArray();
        $zones = Zone::select('id', 'number', 'genre_name', 'floor_id')->orderBy('genre_name', 'asc')->get()->toArray();

        return Inertia::render('loans/Edit', [
            'loan' => $loan,
            'user_email'=> $loan->user->email,
            'book_isbn' => $loan->book->isbn,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    /**
     * Update the specified loan in storage.
     */
    public function update(Request $request, Loan $loan, LoanUpdateAction $action)
    {

    
        // Validación de los datos
        $validator = Validator::make($request->all(), [     
            'due_date' => ['nullable', 'date', 'after_or_equal:loan_date'],
            'new_is_active' => ['nullable'],
            'new_return_date' => [ 'string'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Ejecutar la acción de actualización
        $action($loan, $validator->validated());

        // Construir la URL para redirigir, manteniendo los parámetros de la página y perPage
        $redirectUrl = route('loans.index');

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
     * Remove the specified loan from storage.
     */
    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        $action($loan);

        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.deleted'));
    }
}
