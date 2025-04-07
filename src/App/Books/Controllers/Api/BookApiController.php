<?php

namespace App\Books\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookDestroyAction;
use Domain\Books\Actions\BookIndexAction;
use Domain\Books\Actions\BookStoreAction;
use Domain\Books\Actions\BookUpdateAction;
use Domain\Books\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class BookApiController extends Controller
{
    public function index(Request $request, BookIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function show(Book $book)
    {
        return response()->json(['book' => $book]);
    }

    public function store(Request $request, BookStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:books'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $book = $action($validator->validated());

        return response()->json([
            'message' => __('messages.books.created'),
            'book' => $book
        ]);
    }

    public function update(Request $request, Book $book, BookUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedbook = $action($book, $validator->validated());

        return response()->json([
            'message' => __('messages.books.updated'),
            'book' => $updatedbook
        ]);
    }

    public function destroy(Book $book, BookDestroyAction $action)
    {
        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }
    
        $action($book);
        return response()->json([
            'message' => __('messages.books.deleted')
        ]);
    }
    
}