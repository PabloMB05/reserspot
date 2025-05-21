<?php

namespace Domain\Stores\Actions;

use Domain\Stores\Models\Store;

class StoreDeleteAction
{
    public function execute(Store $store): void
    {
        $store->delete();
    }
}