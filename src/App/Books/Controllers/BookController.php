<?php

namespace App\Books\Controllers;

use App\Core\Controllers\Controller;
use Domain\Books\Models\Book;
use Illuminate\Http\Request;
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

        $authors = Book::all()->pluck('author')->unique()->map(function ($author) {
            return [
                'value' => strtolower(str_replace(' ', '_', $author)),
                'label' => $author,
            ];
        })->values()->toArray();

        return Inertia::render('books/Create', ['authors' => $authors]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function edit(Request $request, Book $book)
    {
        return Inertia::render('books/Edit', [
            'book' => $book,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
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