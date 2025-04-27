<?php

namespace Database\Seeders;

use Domain\Books\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run()
    {
        // Crear 50 libros usando la fábrica
        $books = Book::factory(50)->create();

        // Agregar medios para cada libro usando su UUID
        foreach ($books as $book) {
            // Aquí agregamos un archivo desde una URL a cada libro
            $book->addMediaFromUrl('https://img.freepik.com/free-vector/abstract-elegant-winter-book-cover_23-2148798745.jpg')->toMediaCollection('media');
        }
    }
}
