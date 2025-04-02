<?php

namespace Database\Seeders;

use Domain\Bookcases\Models\Bookcase;
use Domain\Models\floors\Floor;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookcaseSeeder extends Seeder
{
    public function run()
    {
        // Insert specific data

        Bookcase::factory(100)->create();


    }
}