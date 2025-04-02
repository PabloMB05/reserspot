<?php

namespace App\Bookcases\Controllers;

use App\Core\Controllers\Controller;
use Domain\Bookcases\Models\Bookcase;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookcaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('bookcases/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $zones = Zone::select('id', 'name')
            ->orderBy('name')
            ->get()
            ->map(function ($zone) {
                return [
                    'value' => $zone->id,
                    'label' => $zone->name,
                ];
            })
            ->toArray();

        return Inertia::render('bookcases/Create', compact('zones'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'number' => 'required|string|max:255|unique:bookcases,number',
            'capacity' => 'required|integer|min:1',
            'zone_id' => 'required|exists:zones,id',
        ]);

        Bookcase::create($validated);

        return redirect()->route('bookcases.index')
            ->with('success', 'Bookcase created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Bookcase $bookcase)
    {
        $zones = Zone::select('id', 'name')
            ->orderBy('name')
            ->get()
            ->map(function ($zone) {
                return [
                    'value' => $zone->id,
                    'label' => $zone->name,
                ];
            })
            ->toArray();

        return Inertia::render('bookcases/Edit', [
            'bookcase' => $bookcase,
            'zones' => $zones,
            'page' => $request->query('page', 1),
            'perPage' => $request->query('perPage', 10),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bookcase $bookcase)
    {
        $validated = $request->validate([
            'number' => 'required|string|max:255|unique:bookcases,number,'.$bookcase->id,
            'capacity' => 'required|integer|min:1',
            'zone_id' => 'required|exists:zones,id',
        ]);

        $bookcase->update($validated);

        return redirect()->route('bookcases.index', [
            'page' => $request->query('page', 1),
            'perPage' => $request->query('perPage', 10),
        ])->with('success', 'Bookcase updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookcase $bookcase)
    {
        $bookcase->delete();

        return redirect()->route('bookcases.index')
            ->with('success', 'Bookcase deleted successfully');
    }
}