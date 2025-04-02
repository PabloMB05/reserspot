<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Models\Bookcase;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class BookcaseIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10, ?string $zoneId = null): LengthAwarePaginator
    {
        $query = Bookcase::with(['zone', 'books'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('number', 'like', "%{$search}%")
                      ->orWhere('capacity', 'like', "%{$search}%")
                      ->orWhereHas('zone', function ($q) use ($search) {
                          $q->where('number', 'like', "%{$search}%")
                            ->orWhere('genre_name', 'like', "%{$search}%");
                      })
                      ->orWhereHas('books', function ($q) use ($search) {
                          $q->where('title', 'like', "%{$search}%")
                            ->orWhere('author', 'like', "%{$search}%");
                      });
                });
            })
            ->when($zoneId, function ($query, $zoneId) {
                $query->where('zone_id', $zoneId);
            });
    
        return $query->orderBy('number')->paginate($perPage);
    }
}