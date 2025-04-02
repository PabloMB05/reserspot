<?php

namespace Domain\Models\floors\Actions;

use Domain\Models\floors\Data\Resources\FloorResource;
use Domain\Models\floors\Floor;

class FloorIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $floors = Floor::query()
            ->when($search, function ($query, $search) {
                $query->where('floor_number', 'like', "%{$search}%")
                    ->orWhere('capacity', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage);

        return $floors->through(fn ($floor) => FloorResource::fromModel($floor));
    }
}
