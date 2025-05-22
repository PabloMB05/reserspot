<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Domain\Event\Models\Event;
use Domain\ShoppingCenter\Models\ShoppingCenter; // Asegúrate de que este namespace sea correcto
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtiene todos los shopping centers existentes
        $shoppingCenters = ShoppingCenter::all();

        if ($shoppingCenters->isEmpty()) {
            $this->command->warn('No hay centros comerciales para asociar eventos.');
            return;
        }

        foreach ($shoppingCenters as $center) {
            Event::create([
                'id' => (string) Str::uuid(),
                'shopping_center_id' => $center->id,
                'title' => 'Festival de Música',
                'description' => 'Disfruta de un día lleno de música en vivo y comida.',
                'start_time' => Carbon::now()->addDays(rand(1, 10))->setTime(16, 0),
                'end_time' => Carbon::now()->addDays(rand(1, 10))->setTime(22, 0),
                'location' => 'Plaza central',
            ]);

            Event::create([
                'id' => (string) Str::uuid(),
                'shopping_center_id' => $center->id,
                'title' => 'Feria de Libros',
                'description' => 'Encuentra tus libros favoritos con grandes descuentos.',
                'start_time' => Carbon::now()->addDays(rand(5, 15))->setTime(10, 0),
                'end_time' => Carbon::now()->addDays(rand(5, 15))->setTime(18, 0),
                'location' => 'Segundo piso, ala norte',
            ]);
        }
    }
}
