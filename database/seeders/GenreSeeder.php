<?php

namespace Database\Seeders;

use Domain\Genres\Models\Genre;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    public function run()
    {
        // Insert specific data
        Genre::create(['name' => 'Fantasy']);
        Genre::create(['name' => 'Drama']);
        Genre::create(['name' => 'Historical']);
        Genre::create(['name' => 'Science Fiction']);
        Genre::create(['name' => 'Horror']);
        Genre::create(['name' => 'Mystery']);
        Genre::create(['name' => 'Thriller']);
        Genre::create(['name' => 'Romance']);
        Genre::create(['name' => 'Adventure']);
        Genre::create(['name' => 'Dystopian']);
        Genre::create(['name' => 'Gothic']);
        Genre::create(['name' => 'Magical Realism']);
        Genre::create(['name' => 'Satire']);
        Genre::create(['name' => 'Comedy']);
        Genre::create(['name' => 'Tragedy']);
        Genre::create(['name' => 'Crime Fiction']);
        Genre::create(['name' => 'Mythology']);
        Genre::create(['name' => 'Western']);
        Genre::create(['name' => 'Cyberpunk']);
        Genre::create(['name' => 'Poetry']);



    }
}