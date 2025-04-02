<?php

namespace Domain\Books\Data\Resources;

use Domain\Books\Models\Book;
use Spatie\LaravelData\Data;

class BookResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly array $genres,
        public readonly string $author,
        public readonly int $length,
        public readonly string $editor,
        public readonly string $bookcase_id,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Book $book): self
    {
        return new self(
            id: $book->id,
            title: $book->title,
            genres: $book->genres->pluck('name')->toArray(), // Assuming genres have a 'name' attribute
            author: $book->author,
            length: $book->length,
            editor: $book->editor,
            bookcase_id: $book->bookcase_id,
            created_at: $book->created_at->format('Y-m-d H:i:s'),
            updated_at: $book->updated_at->format('Y-m-d H:i:s'),
        );
    }
}