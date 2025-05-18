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
        // Obtener todos los centros comerciales
        $shoppingCenters = ShoppingCenter::all();

        if ($shoppingCenters->isEmpty()) {
            $this->command->warn('No hay centros comerciales en la base de datos.');
            return;
        }

        // Definir algunos pisos por defecto para cada centro comercial
        $floors = [
            'Planta 0',
            'Planta 1',
            'Planta -1',
            'Planta 2', // Si hay más plantas en algunos centros comerciales
        ];

        foreach ($shoppingCenters as $shoppingCenter) {
            foreach ($floors as $floorName) {
                DB::table('floors')->insert([
                    'id' => Str::uuid(),
                    'shopping_center_id' => $shoppingCenter->id,
                    'name' => $floorName,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
