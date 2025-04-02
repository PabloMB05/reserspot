<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Models\floors\Floor;

class FloorSeeder extends Seeder
{
    public function run(): void
    {
        Floor::factory(5)->create();
    }
}
