<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Data\Resources\BookcaseResource;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Support\Facades\Hash;

class BookcaseStoreAction
{
    public function __invoke(array $data): BookcaseResource
    {
        $user = Bookcase::create([
            'number' => $data['number'],
            'zone_id' => $data['zone_id'],
            'capacity' => $data['capacity'],
        ]);

        return BookcaseResource::fromModel($user);
    }
}