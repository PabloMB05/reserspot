<?php

namespace App\Parking\Controllers;

use Domain\ShoppingCenter\Models\ShoppingCenter;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
class ParkingController extends Controller
{
    public function index(ShoppingCenter $shoppingCenter)
    {
        $shoppingCenter->load([
            'floors.zones.parkingSpots' => function($query) {
                $query->orderBy('spot_number');
            },
            'openingHours'
        ]);
        return Inertia::render('Parking/Index', [
            'shoppingCenter' => $shoppingCenter
        ]);
    }
}