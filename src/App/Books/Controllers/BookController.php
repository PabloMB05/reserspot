<?php

namespace App\Books\Controllers;

use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookStoreAction;
use Domain\Books\Actions\BookUpdateAction;
use Domain\Books\Actions\BookDestroyAction;
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

        return Inertia::render('books/create', ['genres' => $genres, 'floors' => $floors, 'zones' => $zones, 'bookcases' => $bookcases]);
    }

    public function store(Request $request, BookStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string'],
            'author' => ['required', 'string'],
            'editor' => ['required', 'string'],
            'length' => ['required', 'integer', 'min:1'],
            'isbn' => ['required', 'string'],
            'bookcase_id' => ['required', 'string'],
            'genres' => ['required']
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
        $floors = Floor::select('id','floor_number') // Cambiado a 'number' para coincidir con el frontend

            ->get()
            ->toArray();
    
        // Obtener todas las zonas, ordenadas por nombre de género
        $zones = Zone::select('id', 'number', 'genre_name', 'floor_id')
            ->orderBy('genre_name', 'asc')
            ->get()
            ->toArray();
    
        // Obtener las estanterías con información básica
        $bookcases = Bookcase::select('id', 'number', 'zone_id', 'capacity') // Agregadas columnas necesarias
            ->get()
            ->map(function ($bookcase) {
                return [
                    'id' => $bookcase->id,
                    'number' => $bookcase->number,
                    'zone_id' => $bookcase->zone_id,
                    'capacity' => $bookcase->capacity,
                    'books_count' => $bookcase->books()->count() // Conteo básico de libros
                ];
            })
            ->toArray();
    
        // Obtener los géneros del libro actual
        $genresExplosion = $book->genres ? explode(', ', $book->genres) : [];

        // Preparar los datos del libro para el frontend
        $bookData = [
            'id' => $book->id,
            'title' => $book->title,
            'author' => $book->author,
            'editor' => $book->editor,
            'length' => $book->length,
            'isbn' => $book->isbn,
            'bookcase_id' => $book->bookcase_id, // Mantenemos el ID para la selección
            'genres' => $book->genres,
            'zone_id' => $book->zone_id,
            'floor_id' => $book->floor_id,
        ];

        return Inertia::render('books/edit', [
            'initialData' => $bookData,
            'genres' => $genres,
            'floors' => $floors,
            'zones' => $zones,
            'bookcases' => $bookcases,
            'explosion' => $genresExplosion,
            'page' => $request->query('page', 1),
            'perPage' => $request->query('perPage', 10),
            'imgPreviaUrl' => $book->image_url ?? null
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
