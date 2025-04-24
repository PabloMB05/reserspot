<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;

class BookStoreAction
{
    public function __invoke(array $data): BookResource
    {


        $book = Book::create([
            'title' => $data['title'],
            'author' => $data['author'],
            'editor' => $data['editor'],
            'length' => $data['length'],
            'isbn' => $data['isbn'], 
            'bookcase_id' => $data['bookcase_id'],
            'genres' => $data['genres'],
        ]);

        return BookResource::fromModel($book);
    }
}
