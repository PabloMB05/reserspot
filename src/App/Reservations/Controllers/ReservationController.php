<?php

namespace App\Reservations\Controllers;

use App\Core\Controllers\Controller;
use Domain\Reservations\Actions\ReservationStoreAction;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';

        return Inertia::render('reservations/Index', ['lang' => $lang]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, ReservationStoreAction $action)
    {

        $user_id = User::where('email', 'like', $request['userMail'])->first()->id;

        $validator = Validator::make($request->all(), [
            'bookID' => [
                'required',
            ],
            'userMail' => ['required'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        // dd($request);

        $action($validator->validated());

        return redirect()->route('books.index')
            ->with('success', __('Reservation created succefully'));
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}