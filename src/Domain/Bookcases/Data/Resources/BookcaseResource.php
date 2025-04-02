<?php

namespace Domain\Bookcases\Data\Resources;

use Domain\Bookcases\Models\Bookcase;
use Domain\Zones\Data\Resources\ZoneResource;
use Spatie\LaravelData\Data;

class BookcaseResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $number,
        public readonly int $capacity,
        public readonly ?string $zone_id,
        public readonly ?string $zone_number,
        public readonly ?string $floor_number,
        public readonly string $created_at,
        public readonly string $updated_at,
        public readonly ?ZoneResource $zone,
        public readonly ?BookCollection $books,
    ) {
    }

    public static function fromModel(Bookcase $bookcase): self
    {
        $zone = $bookcase->zone;
        $floor_number = $zone?->floor?->number ?? null;
        $zone_number = $zone?->number ?? null;

        return new self(
            id: $bookcase->id,
            number: $bookcase->number,
            capacity: $bookcase->capacity,
            zone_id: $bookcase->zone_id,
            zone_number: $zone_number,
            floor_number: $floor_number,
            created_at: $bookcase->created_at->format('Y-m-d H:i:s'),
            updated_at: $bookcase->updated_at->format('Y-m-d H:i:s'),
            zone: $zone ? ZoneResource::fromModel($zone) : null,
            books: $bookcase->books ? BookCollection::from($bookcase->books) : null,
        );
    }
}