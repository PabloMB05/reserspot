<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Data\Resources\BookcaseResource;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Support\Facades\Hash;

class BookcaseUpdateAction
{
    public function __invoke(Bookcase $bookcase, array $data): BookcaseResource
    {
        $updateData = [
            'number' => $data['number'],
            'zone_id' => $data['zone_id'],
            'capacity' => $data['capacity'],
        ];

        $bookcase->update($updateData);

        return BookcaseResource::fromModel($bookcase->fresh());
    }
}