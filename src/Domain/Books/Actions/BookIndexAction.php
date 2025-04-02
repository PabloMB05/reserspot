<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class BookIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10, ?string $bookcaseId = null): LengthAwarePaginator
    {
        $query = Book::with(['bookcase', 'genres'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('author', 'like', "%{$search}%")
                      ->orWhere('editor', 'like', "%{$search}%")
                      ->orWhereHas('bookcase', function ($q) use ($search) {
                          $q->where('number', 'like', "%{$search}%");
                      })
                      ->orWhereHas('genres', function ($q) use ($search) {
                          $q->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->when($bookcaseId, function ($query, $bookcaseId) {
                $query->where('bookcase_id', $bookcaseId);
            });
    
        return $query->orderBy('title')->paginate($perPage);
    }
}