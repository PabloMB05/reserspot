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

    public function show(Bookcase $bookcase)
    {
        return response()->json([
            'bookcase' => $bookcase->load(['zone', 'books'])
        ]);
    }

    public function store(Request $request, BookcaseStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => ['required', 'string', 'max:255', 'unique:bookcases'],
            'capacity' => ['required', 'integer', 'min:1'],
            'zone_id' => ['required', 'exists:zones,id'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $bookcase = $action($validator->validated());

        return response()->json([
            'message' => __('messages.bookcases.created'),
            'bookcase' => $bookcase
        ], 201);
    }

    public function update(Request $request, Bookcase $bookcase, BookcaseUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => ['required', 'string', 'max:255', Rule::unique('bookcases')->ignore($bookcase->id)],
            'capacity' => ['required', 'integer', 'min:1'],
            'zone_id' => ['required', 'exists:zones,id'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedBookcase = $action($bookcase, $validator->validated());

        return response()->json([
            'message' => __('messages.bookcases.updated'),
            'bookcase' => $updatedBookcase
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