<?php

namespace App\Loans\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Actions\LoanIndexAction;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Models\Loan;
use Domain\Loans\Actions\LoanUpdateAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class LoanApiController extends Controller
{
    public function index(Request $request, LoanIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function show(Loan $loan)
    {
        return response()->json(['loan' => $loan]);
    }

    public function store(Request $request, LoanStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'floor_number' => ['required', 'integer', 'unique:loans,floor_number'],
            'capacity' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $loan = $action($validator->validated());

        return response()->json([
            'message' => __('messages.loans.created'),
            'loan' => $loan
        ]);
    }

    public function update(Request $request, Loan $loan, LoanUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'story' => ['required', 'integer', 'unique:loans,story'],
            'capacity' => ['required', 'integer'],
        ]);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedloan = $action($loan, $validator->validated());

        return response()->json([
            'message' => __('messages.loans.updated'),
            'loan' => $updatedloan
        ]);
    }

    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        $action($loan);

        return response()->json([
            'message' => __('messages.loans.deleted')
        ]);
    }
}