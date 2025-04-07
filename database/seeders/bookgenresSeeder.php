<?php

namespace Database\Seeders;

use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Models\Book;
use Domain\Models\floors\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class bookgenresSeeder extends Seeder
{
    public function run()
    {
    $books=Book::all();
    foreach($books as $book){
        $genres=explode(', ',$book->genres);
        foreach($genres as $genre){
            $genreToSync=Genre::where('name', $genre)->first();
            $book->genres()->sync($genreToSync);
        }

    }
}
}
