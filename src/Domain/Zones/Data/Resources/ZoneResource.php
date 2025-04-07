<?php

namespace Domain\Zones\Data\Resources;

use Domain\Models\floors\Zone;
use Domain\Models\floors\Floor;
use Spatie\LaravelData\Data;

class ZoneResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly int $number,
        public readonly int $capacity,
        public readonly string $genre_name, // Cambiado de `genre` a `genre_name`
        public readonly string $floor_id,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    // Método para transformar el modelo Zone en un recurso
    public static function fromModel(Zone $zone): self
    {
     
        
        // Retorna una nueva instancia de ZoneResource
        return new self(
            id: $zone->id,
            number: $zone->number,
            capacity: $zone->capacity,
            genre_name: $zone->genre_name, 
            floor_id: $zone->floor_id,
            
            created_at: $zone->created_at->format('Y-m-d H:i:s'),
            updated_at: $zone->updated_at->format('Y-m-d H:i:s'),
        );
    }
    
}
