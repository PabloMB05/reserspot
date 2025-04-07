<?php

namespace App\Bookcases\Controllers;

use App\Core\Controllers\Controller;
use Domain\Bookcases\Actions\BookcaseDestroyAction;
use Domain\Bookcases\Actions\BookcaseStoreAction;
use Domain\Bookcases\Actions\BookcaseUpdateAction;
use Domain\Bookcases\Models\Bookcase;
use Domain\Models\floors\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BookcaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('bookcases/Index', []);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $zones = Zone::withCount('bookcases')->get()->toArray();
        $floors = Floor::select('id', 'floor_number')->orderBy('floor_number', 'asc')->get()->toArray();
        return Inertia::render('bookcases/Create', ['floors' => $floors, 'zones' => $zones]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, BookcaseStoreAction $action)
    {

        $validator = Validator::make($request->all(), [
            'number' => [
                'required',
                'integer',
                Rule::unique('bookcases', 'number')
                    ->where(fn($query) => $query->where('zone_id', $request->zone_id))
                    ->ignore($request->id),
            ],
            'zone_id' => ['required', 'string'],
            'capacity' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('bookcases.index')
            ->with('success', __('messages.bookcases.created'));
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
        $zones = Zone::withCount('bookcases')->get()->toArray();
        $floors = Floor::select('id', 'floor_number')->orderBy('floor_number', 'asc')->get()->toArray();
        $genres = Genre::select('id', 'name')->get()->toArray();


        return Inertia::render('bookcases/Edit', [
            'bookcase' => $bookcase,
            'floors' => $floors,
            'zones' => $zones,
            'genres' => $genres,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bookcase $bookcase, BookcaseUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => [
                'required',
                'integer',
                Rule::unique('bookcases', 'number')
                    ->where(fn($query) => $query->where('zone_id', $request->zone_id))
                    ->ignore($request->id)
            ],
            'zone_id' => ['required', 'string'],
            'capacity' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($bookcase, $validator->validated());


        $redirectUrl = route('bookcases.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.bookcases.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookcase $bookcase, BookcaseDestroyAction $action)
    {
        $action($bookcase);

        return redirect()->route('bookcases.index')
            ->with('success', __('messages.bookcases.deleted'));
    }
}