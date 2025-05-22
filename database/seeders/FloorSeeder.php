<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Domain\ShoppingCenter\Models\ShoppingCenter;
use Illuminate\Support\Facades\DB;

class FloorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shoppingCenters = ShoppingCenter::all();

        if ($shoppingCenters->isEmpty()) {
            $this->command->warn('No hay centros comerciales en la base de datos.');
            return;
        }

        // Definimos pisos con su nombre y nivel correspondiente
        $floors = [
            ['name' => 'Planta -1', 'level' => -1],
            ['name' => 'Planta 0',  'level' => 0],
            ['name' => 'Planta 1',  'level' => 1],
            ['name' => 'Planta 2',  'level' => 2],
        ];

        foreach ($shoppingCenters as $shoppingCenter) {
            foreach ($floors as $floor) {
                DB::table('floors')->insert([
                    'id' => Str::uuid(),
                    'shopping_center_id' => $shoppingCenter->id,
                    'name' => $floor['name'],
                    'level' => $floor['level'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
