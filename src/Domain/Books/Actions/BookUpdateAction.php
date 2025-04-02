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
        return DB::transaction(function () use ($zone, $data) {
            $updateData = [
                'number' => $data['number'] ?? $zone->number,
                'genre' => $data['genre'] ?? $zone->genre,
                'genreName' => $data['genreName'] ?? $zone->genreName,
                'capacity' => $data['capacity'] ?? $zone->capacity,
                'floor_id' => $data['floor_id'] ?? $zone->floor_id,
            ];

            // Validar que el número de zona sea único (si se está modificando)
            if (isset($data['number']) && $data['number'] != $zone->number) {
                if (Zone::where('number', $data['number'])->exists()) {
                    throw ValidationException::withMessages([
                        'number' => 'Zone number already exists'
                    ]);
                }
            }

            $zone->update($updateData);

            return ZoneResource::fromModel($zone->fresh());
        });
    }
}