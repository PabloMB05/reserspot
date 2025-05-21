<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Domain\ParkingSpot\Models\ParkingSpot;
use Domain\Zone\Models\Zone;
use Illuminate\Support\Str;
class ParkingSpotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
public function run(): void
    {
        // Asegurarse de que hay al menos una zona
        $zones = Zone::all();

        if ($zones->isEmpty()) {
            $this->command->warn('No zones found. Creating one for demo...');
            $zones->push(Zone::create([
                'id' => Str::uuid(),
                'name' => 'Zona A',
                'shopping_center_id' => \Domain\ShoppingCenter\Models\ShoppingCenter::first()?->id ?? Str::uuid(),
            ]));
        }

        foreach ($zones as $zone) {
            for ($i = 1; $i <= 10; $i++) {
                ParkingSpot::create([
                    'id' => Str::uuid(),
                    'zone_id' => $zone->id,
                    'spot_number' => "P{$i}",
                    'is_occupied' => fake()->boolean(30), // 30% de probabilidad de estar ocupado
                ]);
            }
        }

        $this->command->info('Parking spots seeded successfully.');
    }
}