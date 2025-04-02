<?php

namespace Domain\Zones\Data\Resources;

use Domain\Zones\Models\Zone;
use Domain\Models\floors\Floor;
use Spatie\LaravelData\Data;

class ZoneResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly int $number,
        public readonly int $capacity,
        public readonly string $genre_name, // Cambiado de `genre` a `genre_name`
        public readonly int $floor_number,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    // Método para transformar el modelo Zone en un recurso
    public static function fromModel(Zone $zone): self
    {
        // Obtén el piso relacionado por ID
        $piso = Floor::find($zone->floor_id);
        $floor_number = $piso->number; // Asumo que 'number' es el campo que se refiere al número del piso

        // Retorna una nueva instancia de ZoneResource
        return new self(
            id: $zone->id,
            number: $zone->number,
            capacity: $zone->capacity,
            genre_name: $zone->genreName, // Usa `genreName` para obtener el nombre del género
            floor_number: $floor_number,
            created_at: $zone->created_at->format('Y-m-d H:i:s'),
            updated_at: $zone->updated_at->format('Y-m-d H:i:s'),
        );
    }
    
}
