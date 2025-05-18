<?php

namespace App\ShoppingCenter\Controllers;

use App\Http\Controllers\Controller;
use Domain\ShoppingCenter\Models\ShoppingCenter;
use Illuminate\Http\JsonResponse;

class ShoppingCenterController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $centers = ShoppingCenter::with('openingHours')
                ->select('id', 'name', 'location', 'description')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $centers,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los centros comerciales.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
