<?php

namespace Domain\Stores\Actions;

use Domain\Stores\Models\Store;
use Domain\Stores\Data\Resources\StoreResource;

class StoreShowAction
{
    public function execute(Store $store): array
    {
        $store->load(['storeCategory', 'storeLocations', 'shoppingCenter']);
        return StoreResource::fromModel($store);
    }
}