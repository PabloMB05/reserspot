<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ZoneUpdateAction
{
    public function __invoke(Zone $zone, array $data): ZoneResource
    {
        // Verificamos y preparamos los datos para la actualización
        $updateData = [
            'number' => $data['number'] ,        // Se actualiza el número si se pasa uno nuevo
            'capacity' => $data['capacity'] ,  // Se corrige el campo aquí para actualizar la capacidad
            'genre_name' => $data['genre_name'],  // Se actualiza el nombre del género si se pasa uno nuevo
            'floor_id' => $data['floor_id'],  // Se actualiza el ID del piso si se pasa uno nuevo
        ];

        // Actualiza el modelo con los nuevos datos
        $zone->update($updateData);

        // Retorna la zona actualizada como un recurso
        return ZoneResource::fromModel($zone->fresh());
    }
}
