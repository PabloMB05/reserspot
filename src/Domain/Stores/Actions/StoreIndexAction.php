<?php

namespace Domain\Stores\Actions;

use Domain\Stores\Data\Resources\StoreResource;
use Domain\ShoppingCenter\Models\ShoppingCenter;
use Domain\Stores\Models\Store;

class StoreIndexAction
{
    public function execute(
        ?string $search = null,
        int $perPage = 10,
        string $shoppingCenterID
    ): LengthAwarePaginator {
        return Store::query()
            ->with('storeCategory') // Carga la relación de categoría
            ->where('shopping_center_id', $ShoppingCenterID) // Filtra por el centro comercial
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('phone', 'like', "%{$search}%");
            })
            ->orderBy('name')
            ->paginate($perPage);
    }
}