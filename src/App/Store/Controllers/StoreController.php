<?php

namespace App\Store\Controllers;

use App\Http\Controllers\Controller;
use Domain\Stores\Actions\StoreIndexAction;
use Domain\Stores\Actions\StoreShowAction;
use Domain\Stores\Actions\StoreDeleteAction;
use Domain\ShoppingCenter\Models\ShoppingCenter;
use Domain\Stores\Models\Store;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index(Request $request, $shoppingCenterID)
    {
if ($shoppingCenterID) {
    // Cargar el centro comercial con sus tiendas usando la relación
    $shoppingCenter = ShoppingCenter::with('stores.storeCategory')->findOrFail($shoppingCenterID);

    // Obtener tiendas usando el scope (útil si necesitas aplicar más filtros en el futuro)
    $stores = Store::forShoppingCenter($shoppingCenterID)->get();
    return inertia('stores/index', [
        'shoppingCenter' => $shoppingCenter,
        'stores' => $stores,
    ]);
} else {
    // Obtener todos los centros comerciales con sus tiendas
    $shoppingCenters = ShoppingCenter::with('stores')->get();

    return inertia('stores/index', [
        'shoppingCenters' => $shoppingCenters,
    ]);
}

    }
    public function show(){
        
    }
}