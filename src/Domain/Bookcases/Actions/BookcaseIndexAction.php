<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Data\Resources\BookcaseResource;
use Domain\Bookcases\Models\Bookcase;
use Domain\Models\floors\Floor;
use Domain\Zones\Models\Zone;

class BookcaseIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $number = $search[0];
        $capacity = $search[1];
        $floor = $search[2];
        $zone = $search[3];
        $genre = $search[4];

        $floor_id = Floor::query()->when($floor !== "null", function ($query) use ($floor) {
            $query->where('floor_number', '=', $floor);
        })->first()->id;

        $zones = Zone::query()->when($zone !== "null", function ($query) use ($zone) {
            $query->where('number', '=', $zone);
        })
        ->when($floor !== "null", function ($query) use ($floor_id) {
            $query->where('floor_id', '=', $floor_id);
        })
        ->when($genre !== "null", function ($query) use ($genre) {
            $query->where('genre_name', 'ILIKE', '%' . $genre . '%');
        })->pluck('id');

        $bookcase = Bookcase::query()
            ->when($number !== "null", function ($query) use ($number) {
                $query->where('number', '=', $number);
            })
            ->when($capacity !== "null", function ($query) use ($capacity) {
                $query->where('capacity', '=', $capacity);
            })
            ->when($zones !== "null", function ($query) use ($zones) {
                $query->whereIn('zone_id', $zones);
            })
            ->latest()
            ->paginate($perPage);

        return $bookcase->through(fn($bookcase) => BookcaseResource::fromModel($bookcase));
    }
}