<?php

namespace Domain\Models\Floors\Data\Resources;

use Domain\Models\floors\Floor;
use Spatie\LaravelData\Data;

class FloorResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly int $floor_number,
        public readonly int $capacity,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Floor $floor): self
    {
        return new self(
            id: $floor->id,
            floor_number: $floor->floor_number,
            capacity: $floor->capacity,
            created_at: $floor->created_at->format('Y-m-d H:i:s'),
            updated_at: $floor->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
