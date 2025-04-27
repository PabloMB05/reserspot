<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            FloorSeeder::class,
            GenreSeeder::class,
            ZoneSeeder::class,
            BookcaseSeeder::class,
            BookSeeder::class,
            bookgenresSeeder::class,
        ]);



    }
}