<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Data\Resources\BookcaseResource;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Support\Facades\DB;

class BookcaseStoreAction
{
    public function __invoke(array $data): BookcaseResource
    {
        return DB::transaction(function () use ($data) {
            $bookcase = Bookcase::create([
                'number' => $data['number'],
                'capacity' => $data['capacity'],
                'zone_id' => $data['zone_id'], // UUID de la zona
            ]);

            // Cargar relaciones necesarias para el Resource
            $bookcase->load(['zone', 'books']);

            return BookcaseResource::fromModel($bookcase);
        });
    }
}