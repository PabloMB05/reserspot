<?php

namespace Domain\Stores\Actions;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Domain\Stores\Models\Store;

class StoreIndexAction
{
    /**
     * Ejecuta la consulta para obtener tiendas filtradas y paginadas.
     *
     * @param string      $shoppingCenterID
     * @param string|null $search
     * @param string|null $category
     * @param int         $perPage
     * @return LengthAwarePaginator
     */
    public function execute(
        string $shoppingCenterID,
        ?string $search = null,
        ?string $category = null,
        int $perPage = 10
    ): LengthAwarePaginator {
        return Store::query()
            ->with('storeCategory')
            ->where('shopping_center_id', $shoppingCenterID)
            // Filtro de búsqueda (nombre, email, teléfono)
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('phone', 'like', "%{$search}%");
                });
            })
            // Filtro por categoría
            ->when($category, function ($query, $category) {
                $query->where('store_category_id', $category);
            })
            ->orderBy('name')
            ->paginate($perPage);
    }
}
