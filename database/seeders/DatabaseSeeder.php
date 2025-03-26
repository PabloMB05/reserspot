<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

// Asegúrate de importar todos los seeders necesarios
use Database\Seeders\FloorSeeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\ZoneSeeder;
use Database\Seeders\GenreSeeder;
use Database\Seeders\BookShelfSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            FloorSeeder::class, 
            ZoneSeeder::class,
            GenreSeeder::class,
            BookShelfSeeder::class,
        ]);

    }
}
