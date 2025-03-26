<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Models\floors\floor;

class FloorSeeder extends Seeder
{
    public function run(): void
    {
        floor::factory(5)->create();
    }
}
