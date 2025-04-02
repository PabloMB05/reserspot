<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Data\Resources\BookcaseResource;
use Domain\Bookcases\Models\Bookcase;

class BookcaseIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $bookcases = Bookcase::with(['zone', 'books'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('number', 'like', "%{$search}%")
                      ->orWhere('capacity', 'like', "%{$search}%")
                      ->orWhereHas('zone', function ($q) use ($search) {
                          $q->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->orderBy('number', 'asc')
            ->paginate($perPage);

        return $bookcases->through(fn ($bookcase) => BookcaseResource::fromModel($bookcase));
    }
}