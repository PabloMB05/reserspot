<?php

namespace Domain\Stores\Data\Resources;

use Domain\Stores\Models\Store;

class StoreResource
{
    public static function fromModel(Store $store): array
    {
        return [
            'id' => $store->id,
            'name' => $store->name,
            'website' => $store->website,
            'email' => $store->email,
            'phone' => $store->phone,
            'category' => $store->storeCategory ? [
                'id' => $store->storeCategory->id,
                'name' => $store->storeCategory->name
            ] : null,
            'locations' => $store->storeLocations->map(function($location) {
                return [
                    'id' => $location->id,
                    'floor' => $location->floor,
                    'description' => $location->description
                ];
            })->toArray(),
            'shoppingCenter' => [
                'id' => $store->shoppingCenter->id,
                'name' => $store->shoppingCenter->name,
                'location' => $store->shoppingCenter->location
            ]
        ];
    }
}