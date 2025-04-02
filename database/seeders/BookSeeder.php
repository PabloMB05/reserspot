<?php

namespace Database\Seeders;

use Domain\Books\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run()
    {
        // Insert specific data

        Book::factory(50)->create();

    }
}