<?php

namespace App\Bookcases\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Bookcases\Actions\BookcaseDestroyAction;
use Domain\Bookcases\Actions\BookcaseIndexAction;
use Domain\Bookcases\Actions\BookcaseStoreAction;
use Domain\Bookcases\Actions\BookcaseUpdateAction;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class BookcaseApiController extends Controller
{
    public function index(Request $request, BookcaseIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function show(Bookcase $book)
    {
        return response()->json(['book' => $book]);
    }

    public function store(Request $request, BookcaseStoreAction $action)
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

    public function update(Request $request, Bookcase $book, BookcaseUpdateAction $action)
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

    public function destroy(Bookcase $bookcase, BookcaseDestroyAction $action)
    {
        $action($bookcase);

        return response()->json([
            'message' => __('messages.bookcases.deleted')
        ]);
    }
}