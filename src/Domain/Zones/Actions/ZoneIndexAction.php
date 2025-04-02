<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

use Illuminate\Support\Facades\Log;

class ZoneIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10, ?string $floorId = null): LengthAwarePaginator
    {
        $query = Zone::with(['floor', 'genre'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('number', 'like', "%{$search}%")
                      ->orWhere('genre_name', 'like', "%{$search}%")
                      ->orWhereHas('floor', function ($q) use ($search) {
                          $q->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->when($floorId, function ($query, $floorId) {
                $query->where('floor_id', $floorId);
            });
    
        return $query->orderBy('number')->paginate($perPage);
    }
}