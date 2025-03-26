<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Domain\Models\bookshelf\bookshelf;

class BookShelfSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        bookshelf::factory(5)->create();
    }
}
