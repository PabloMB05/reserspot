<?php

namespace App\Events\Controllers;

use Domain\Event\Models\Event;
use Domain\ShoppingCenter\Models\ShoppingCenter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $shoppingCenters = ShoppingCenter::with('events')->get();

        return Inertia::render('events/index', [
            'shoppingCenters' => $shoppingCenters,
        ]);
    }

    public function show(string $id)
    {
        if (!Str::isUuid($id)) {
            abort(404, 'ID inválido');
        }

        $event = Event::with('shoppingCenter')->findOrFail($id);

        return Inertia::render('events/EventsShow', [
            'event' => $event,
        ]);
    }
    public function centerEvents($id)
{
    $shoppingCenter = ShoppingCenter::with('events')->findOrFail($id);

    return Inertia::render('events/index', [
        'shoppingCenter' => $shoppingCenter,
    ]);
}
}
