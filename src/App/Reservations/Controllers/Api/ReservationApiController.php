<?php

namespace App\Reservations\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Reservations\Actions\ReservationDestroyAction;
use Domain\Reservations\Actions\ReservationIndexAction;
use Domain\Reservations\Actions\ReservationStoreAction;
use Domain\Reservations\Models\Reservation;
use Domain\Reservations\Actions\ReservationUpdateAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ReservationApiController extends Controller
{
    public function index(Request $request, ReservationIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function show(Reservation $reservation)
    {
        return response()->json(['reservation' => $reservation]);
    }

    public function store(Request $request, ReservationStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'floor_number' => ['required', 'integer', 'unique:reservations,floor_number'],
            'capacity' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $reservation = $action($validator->validated());

        return response()->json([
            'message' => __('messages.reservations.created'),
            'reservation' => $reservation
        ]);
    }

    public function update(Request $request, Reservation $reservation, ReservationUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'floor_number' => ['required', 'integer', 'unique:reservations,floor_number'],
            'capacity' => ['required', 'integer'],
        ]);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedreservation = $action($reservation, $validator->validated());

        return response()->json([
            'message' => __('messages.reservations.updated'),
            'reservation' => $updatedreservation
        ]);
    }

    public function destroy(Reservation $reservation, ReservationDestroyAction $action)
    {
        $action($reservation);

        return response()->json([
            'message' => __('messages.reservations.deleted')
        ]);
    }
}