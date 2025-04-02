<?php

namespace Domain\Bookcases\Data\Resources;

use Domain\Bookcases\Models\Bookcase;
use Domain\Zones\Data\Resources\ZoneResource;
use Spatie\LaravelData\Data;

class BookcaseResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $number,       // Número de estantería
        public readonly int $capacity,        // Capacidad
        public readonly ?string $zone_id,     // ID de zona (nullable)
        public readonly ?string $zone_number,  // Número de zona (nullable)
        public readonly ?string $floor_number, // Número de piso (nullable)
        public readonly string $created_at,   // Fecha creación
        public readonly string $updated_at,   // Fecha actualización
    ) {
    }

    public static function fromModel(Bookcase $bookcase): self
    {
        return new self(
            id: $bookcase->id,
            number: $bookcase->number,
            capacity: $bookcase->capacity,
            zone_id: $bookcase->zone_id,
            zone_number: $bookcase->zone?->number, // Número de zona (si existe)
            floor_number: $bookcase->zone?->floor?->number, // Número de piso (si existe)
            created_at: $bookcase->created_at->format('Y-m-d H:i:s'),
            updated_at: $bookcase->updated_at->format('Y-m-d H:i:s'),
        );
    }
}