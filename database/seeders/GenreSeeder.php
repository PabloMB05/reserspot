<?php

namespace Database\Seeders;

use Domain\Models\genre;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        genre::factory(10)->create();
    }
}
