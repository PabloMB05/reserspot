<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Domain\ShoppingCenter\Models\ShoppingCenter;

class ShoppingCenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ShoppingCenter::create([
            'id' => (string) Str::uuid(),
            'name' => 'Centro Comercial ReserSpot',
            'location' => 'Avenida Central 123, Madrid',
        ]);

        ShoppingCenter::create([
            'id' => (string) Str::uuid(),
            'name' => 'ReserSpot Zenia',
            'location' => 'Calle Zenia 45, Alicante',
        ]);

        ShoppingCenter::create([
            'id' => (string) Str::uuid(),
            'name' => 'ReserSpot Maquinista',
            'location' => 'Gran Vía 7, Barcelona',
        ]);
    }
}
