<?php

namespace Database\Seeders;

use Domain\Models\floors\Floor;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ZoneSeeder extends Seeder
{
    public function run()
    {
        Zone::factory(50)->create();

    }
}