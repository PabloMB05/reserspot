<?php

namespace App\Store\Controllers\Api;

use App\Http\Controllers\Controller;
use Domain\Stores\Models\Actions\FloorDestroyAction;
use Domain\Stores\Models\Actions\StoreIndexAction;
use Domain\Stores\Models\Store;

class StoreApiController extends Controller
{
    public function index(Request $request, StoreIndexAction $action, string $ShoppingCenterID)
    {
        // Verificar que el centro comercial existe
        ShoppingCenter::findOrFail($ShoppingCenterID);
        
        // Pasar el ID del centro comercial a la acción
        return response()->json(
            $action->execute(
                search: $request->search,
                perPage: $request->integer('per_page', 10),
                shoppingCenterId: $ShoppingCenterID
            )
        );
    }
}
