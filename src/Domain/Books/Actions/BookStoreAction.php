<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\FileBag;
class BookStoreAction
{
    public function __invoke(array $data, FileBag $imagenes): BookResource
    {
        $generos = implode(', ', $data['generos']);

        $book = Book::create([
            'title' => $data['title'],
            'isbn' => $data['isbn'],
            'author' => $data['author'],
            'editor' => $data['editor'],
            'length' => $data['length'],
            'bookcase_id' => $data['bookcase_id'],
            'genres' => $generos,
        ]);

        foreach ($imagenes as $imagen) {
            $book->addMedia($imagen)->toMediaCollection('media');
        };

        return BookResource::fromModel($book);
    }
}