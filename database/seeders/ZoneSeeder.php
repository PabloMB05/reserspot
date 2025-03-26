<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Models\zones\zone;

class ZoneSeeder extends Seeder
{
    public function run(): void
    {
        zone::factory(5)->create();
    }
}
