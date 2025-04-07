<?php

namespace Domain\Books\Actions;

use Domain\Books\Models\Book;
use Domain\Models\floors\Floor;
use Domain\Zones\Models\Zone;
use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Data\Resources\BookResource;

class BookIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        [$title, $genres, $author, $length, $editor, $floorNumber, $zoneNumber, $bookcaseNumber] = $search ?? [];

        // Obtener floor_id si corresponde
        $floorId = null;
        if ($floorNumber !== "null") {
            $floorId = Floor::where('floor_number', $floorNumber)->value('id');
        }

        // Filtrar zonas por número y floor_id
        $zoneIds = Zone::query()
            ->when($zoneNumber !== "null", fn ($q) => $q->where('number', $zoneNumber))
            ->when($floorId, fn ($q) => $q->where('floor_id', $floorId))
            ->pluck('id');

        // Filtrar bookcases por número y zona
        $bookcaseIds = Bookcase::query()
            ->when($bookcaseNumber !== "null", fn ($q) => $q->where('number', $bookcaseNumber))
            ->when($zoneIds->isNotEmpty(), fn ($q) => $q->whereIn('zone_id', $zoneIds))
            ->pluck('id');

        // Construir la consulta principal de libros
        $booksQuery = Book::query()
            ->when($title !== "null", fn ($q) => $q->where('title', 'ILIKE', "%$title%"))
            ->when($genres !== "null", fn ($q) => $q->where('genres', 'ILIKE', "%$genres%"))
            ->when($author !== "null", fn ($q) => $q->where('author', 'ILIKE', "%$author%"))
            ->when($length !== "null", fn ($q) => $q->where('length', $length))
            ->when($editor !== "null", fn ($q) => $q->where('editor', 'ILIKE', "%$editor%"))
            ->when($bookcaseIds->isNotEmpty(), fn ($q) => $q->whereIn('bookcase_id', $bookcaseIds))
            ->latest();

        $paginated = $booksQuery->paginate($perPage);

        return $paginated->through(fn ($book) => BookResource::fromModel($book));
    }
}
