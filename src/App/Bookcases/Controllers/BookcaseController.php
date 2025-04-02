<?php

namespace App\Bookcases\Controllers;

use App\Core\Controllers\Controller;
use Domain\Bookcases\Models\Bookcase;
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
        $zones = Bookcase::with('zone')
            ->get()
            ->pluck('zone.name', 'zone.id')
            ->unique()
            ->map(function ($zoneName, $zoneId) {
                return [
                    'value' => $zoneId,
                    'label' => $zoneName,
                ];
            })
            ->values()
            ->toArray();

        return Inertia::render('bookcases/Create', ['zones' => $zones]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'number' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'zone_id' => 'required|exists:zones,id',
        ]);

        Bookcase::create($validated);

        return redirect()->route('bookcases.index')
            ->with('success', 'Bookcase created successfully');
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
    public function edit(Request $request, Bookcase $bookcase)
    {
        $zones = Bookcase::with('zone')
            ->get()
            ->pluck('zone.name', 'zone.id')
            ->unique()
            ->map(function ($zoneName, $zoneId) {
                return [
                    'value' => $zoneId,
                    'label' => $zoneName,
                ];
            })
            ->values()
            ->toArray();

        return Inertia::render('bookcases/Edit', [
            'bookcase' => $bookcase,
            'zones' => $zones,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bookcase $bookcase)
    {
        $validated = $request->validate([
            'number' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'zone_id' => 'required|exists:zones,id',
        ]);

        $bookcase->update($validated);

        return redirect()->route('bookcases.index', [
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
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