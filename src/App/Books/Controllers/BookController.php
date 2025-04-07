<?php

namespace App\Books\Controllers;

use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookStoreAction;
use Domain\Books\Actions\BookUpdateAction;
use Domain\Books\Models\Book;
use Domain\Bookcases\Models\Bookcase;
use Domain\Models\floors\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('books/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $floors = Floor::select('id', 'floor_number')->orderBy('floor_number', 'asc')->get()->toArray();
        $zones = Zone::select('id', 'number', 'genre_name', 'floor_id')->orderBy('genre_name', 'asc')->get()->toArray();
        $bookcases = Bookcase::withCount('books')->get()->toArray();
        $genres = Genre::select('name')->get()->map(function ($genre) {
            return [
                'value' => $genre->name,
            ];
        })->toArray();

        return Inertia::render('books/Create', ['genres' => $genres, 'floors' => $floors, 'zones' => $zones, 'bookcases' => $bookcases]);
    }

    public function store(Request $request, BookStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string'],
            'author' => ['required', 'string'],
            'editor' => ['required', 'string'],
            'length' => ['required', 'integer', 'min:1'],
            'bookcase_id' => ['required', 'string'],
            'generos' => ['required']
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        $action($validator->validated());
        return redirect()->route('books.index')
            ->with('success', __('messages.books.created'));
    }

    public function show(string $id)
    {
        //
    }

    public function edit(Request $request, Book $book)
    {
        // Obtener todos los géneros
        $genres = Genre::select('name')
            ->get()
            ->map(fn($genre) => ['value' => $genre->name])
            ->toArray();
    
        // Obtener todos los pisos
        $floors = Floor::select('id', 'floor_number')
            ->orderBy('floor_number', 'asc')
            ->get()
            ->toArray();
    
        // Obtener todas las zonas, ordenadas por nombre de género
        $zones = Zone::select('id', 'number', 'genre_name', 'floor_id')
            ->orderBy('genre_name', 'asc')
            ->get()
            ->toArray();
    
        // Obtener las estanterías, sin necesidad de contar libros si no es necesario
        $bookcases = Bookcase::select('id', 'number')  // Solo obtener las columnas necesarias
            ->get()
            ->toArray();
    
        // Expansión de los géneros desde la cadena
        $genresExplosion = explode(', ', $book->genres);
    
        // Devolver la vista de edición
        return Inertia::render('books/Edit', [
            'book' => $book,
            'genres' => $genres,
            'floors' => $floors,
            'zones' => $zones,
            'bookcases' => $bookcases,
            'explosion' => $genresExplosion,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }
    
    public function update(Request $request, Book $book, BookUpdateAction $action)
    {
        // Validación de los datos recibidos
        $validator = Validator::make($request->all(), [
            'number' => [
                'required',
                'integer',
                Rule::unique('bookcases')->where(
                    fn($query) => $query->where('zone_id', $request->zone_id)
                )->ignore($book->id), // Aquí corriges para usar el ID del libro
            ],
            'zone_id' => ['required', 'string'],
            'capacity' => ['required', 'integer'],
        ]);
    
        // Si la validación falla, redirige de vuelta con los errores
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }
    
        // Ejecuta la acción de actualización
        $action($book, $validator->validated());
    
        // Construcción de la URL de redirección para mantener los parámetros de página y perPage
        $redirectUrl = route('books.index');
    
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }
    
        // Redirige de vuelta a la lista de libros con un mensaje de éxito
        return redirect($redirectUrl)
            ->with('success', __('messages.bookcases.updated'));
    }
    

public function destroy(Book $book, BookDestroyAction $action)
    {
        $action($book);

        return redirect()->route('books.index')
            ->with('success', __('messages.books.deleted'));
    }
}
