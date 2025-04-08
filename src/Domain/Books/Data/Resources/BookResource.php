<?php

namespace Domain\Books\Data\Resources;

use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Models\Book;
use Domain\Models\Floors\Floor;
use Domain\Zones\Models\Zone;
use Spatie\LaravelData\Data;

class BookResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly string $genres,
        public readonly string $author,
        public readonly int $length,
        public readonly string $editor,
        public readonly string $isbn,
        public readonly int $bookcase_id,
        public readonly int $zone_id,
        public readonly int $floor_id,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Book $book): self
    {
        // Eager load las relaciones necesarias
        $bookcase = $book->bookcase()->with(['zone.floor'])->first(); // Asegúrate que las relaciones estén definidas en el modelo Book
        $zone = $bookcase->zone;
        $floor = $zone->floor;

        return new self(
            
            id: $book->id,
            title: $book->title,
            genres: $book->genres,
            author: $book->author,
            length: $book->length,
            editor: $book->editor,
            isbn: $book->isbn,
            bookcase_id: $bookcase->number, // Usamos el número del estante
            zone_id: $zone->number,        // Usamos el número de la zona
            floor_id: $floor->floor_number,      
            created_at: $book->created_at->format('Y-m-d H:i:s'),
            updated_at: $book->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
