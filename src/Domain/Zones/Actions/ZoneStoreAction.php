<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\DB;

class ZoneStoreAction
{
    public function __invoke(array $data): ZoneResource
    {

            $zone = Zone::create([
                'capacity' => $data['capacity'],
                'floor_id' => $data['floor_id'], // UUID del piso
                'genre_name' => $data['genre_name'], // Nombre del género
                'number' => $data['number'],
            ]);

            return ZoneResource::fromModel($zone);
    }
}