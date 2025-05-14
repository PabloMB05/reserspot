<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener todos los pisos de la base de datos
        $floors = DB::table('floors')->get();

        // Si no hay pisos, muestra un mensaje de advertencia y termina el proceso
        if ($floors->isEmpty()) {
            $this->command->warn('No hay pisos disponibles en la base de datos.');
            return;
        }

        // Insertar algunas zonas para cada piso
        foreach ($floors as $floor) {
            // Zonas de ejemplo para cada piso
            $zones = [
                ['name' => 'Zona Norte', 'floor_id' => $floor->id],
                ['name' => 'Zona Sur', 'floor_id' => $floor->id],
                ['name' => 'Zona Este', 'floor_id' => $floor->id],
                ['name' => 'Zona Oeste', 'floor_id' => $floor->id],
            ];

            // Insertar las zonas asociadas al piso actual
            foreach ($zones as $zone) {
                DB::table('zones')->insert([
                    'id' => Str::uuid(),
                    'floor_id' => $zone['floor_id'],
                    'name' => $zone['name'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
