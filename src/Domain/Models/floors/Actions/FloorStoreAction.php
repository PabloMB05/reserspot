<?php

namespace Domain\Models\floors\Actions;

use Domain\Models\floors\Data\Resources\FloorResource;
use Domain\Models\floors\Floor;

class FloorStoreAction
{
    public function __invoke(array $data): FloorResource
    {
        $floor = Floor::create([
            'floor_number' => $data['floor_number'],
            'capacity' => $data['capacity'],
        ]);

        return FloorResource::fromModel($floor);
    }
}
