<?php

namespace Domain\Models\floors\Actions;

use Domain\Models\floors\Data\Resources\FloorResource;
use Domain\Models\floors\Floor;

class FloorUpdateAction
{
    public function __invoke(Floor $floor, array $data): FloorResource
    {
        $updateData = [
            'floor_number' => $data['floor_number'],
            'capacity' => $data['capacity'],
        ];

        $floor->update($updateData);

        return FloorResource::fromModel($floor->fresh());
    }
}
