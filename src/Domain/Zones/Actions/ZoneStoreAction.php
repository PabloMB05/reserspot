<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\DB;

class ZoneStoreAction
{
    public function __invoke(array $data): ZoneResource
    {
        return DB::transaction(function () use ($data) {
            $zone = Zone::create([
                'number' => $data['number'],
                'genre' => $data['genre'], // UUID del género
                'genreName' => $data['genreName'], // Nombre del género
                'capacity' => $data['capacity'],
                'floor_id' => $data['floor_id'], // UUID del piso
            ]);

            return ZoneResource::fromModel($zone);
        });
    }
}