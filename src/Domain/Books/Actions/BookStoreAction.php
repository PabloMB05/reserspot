<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;

class BookStoreAction
{
    public function __invoke(array $data): BookResource
    {


        $generos = implode(', ', $data['generos']);

        $book = Book::create([
            'title' => $data['title'],
            'author' => $data['author'],
            'editor' => $data['editor'],
            'length' => $data['length'],
            'bookcase_id' => $data['bookcase_id'],
            'genres' => $generos,
        ]);

        return BookResource::fromModel($book);
    }
}