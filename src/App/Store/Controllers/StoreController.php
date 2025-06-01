<?php

namespace App\Store\Controllers;

use App\Http\Controllers\Controller;
use Domain\Stores\Models\Store;
use Domain\StoreCategory\Models\StoreCategory;
use Domain\ShoppingCenter\Models\ShoppingCenter;
use Domain\Stores\Actions\StoreIndexAction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Lang;


class StoreController extends Controller
{
    public function index(Request $request, $shoppingCenterID)
    {
        // Obtener el centro comercial
        $shoppingCenter = ShoppingCenter::findOrFail($shoppingCenterID);

        // Listado de categorías para el filtro
        $categories = StoreCategory::select('id', 'name')
            ->orderBy('name')
            ->get();

        // Obtener tiendas filtradas (solo search y category)
        $stores = (new StoreIndexAction())->execute(
            $shoppingCenterID,
            $request->input('search'),
            $request->input('category'),
            10 // perPage
        );

        // Render de Inertia sin floor
        return Inertia::render('stores/index', [
        'shoppingCenter' => $shoppingCenter,
        'stores'         => $stores,
        'filters'        => $request->only(['search', 'category']),
        'categories'     => $categories,
        'translations' => [
        'ui' => Lang::get('ui'),
],

    ]);
    }

    public function show()
    {
        // ...
    }
}
