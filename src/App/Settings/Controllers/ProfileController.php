<?php

namespace App\Settings\Controllers;

use App\Core\Controllers\Controller;
use App\Settings\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Domain\ParkingReservation\Models\ParkingReservation;
use Carbon\Carbon;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $user = Auth::user();

        $parkingReservations = ParkingReservation::with([
            'parkingSpot.zone.floor', // Asegura que relaciones estén definidas correctamente
            'shoppingCenter',
        ])
        ->where('user_id', $user->id)
        ->orderByDesc('reserved_at')
        ->get()
        ->map(function ($reservation) {
            $spot = $reservation->parkingSpot;
            $zone = $spot?->zone;
            $floor = $zone?->floor;

            return [
                'id' => $reservation->id,
                'parkingSpot' => $spot?->spot_number ?? 'N/A',
                'zone' => $zone?->name ?? 'N/A',
                'floor' => $floor?->name ?? 'N/A',
                'shoppingCenter' => $reservation->shoppingCenter?->name ?? 'N/A',
                'expedit' => optional($reservation->reserved_at)->toDateTimeString(),
                'canceled_at' => null,
                'reservationDate' => optional($reservation->reserved_at)->toDateString(),
            ];
        });

        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'user' => $user,
            'status' => $request->session()->get('status'),
            'parkingReservations' => $parkingReservations,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
