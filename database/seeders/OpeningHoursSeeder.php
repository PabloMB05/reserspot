<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Domain\ShoppingCenter\Models\ShoppingCenter;

class OpeningHoursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtenemos todos los centros comerciales
        $shoppingCenters = ShoppingCenter::all();

        if ($shoppingCenters->isEmpty()) {
            $this->command->warn('No hay centros comerciales en la base de datos.');
            return;
        }

        $daysOfWeek = [
            'monday' => ['10:00:00', '20:00:00'],
            'tuesday' => ['10:00:00', '20:00:00'],
            'wednesday' => ['10:00:00', '20:00:00'],
            'thursday' => ['12:00:00', '22:00:00'], // Horario especial el jueves
            'friday' => ['10:00:00', '23:00:00'],   // Horario extendido el viernes
            'saturday' => ['10:00:00', '23:00:00'],  // Horario extendido el sábado
            'sunday' => ['11:00:00', '18:00:00'],    // Horario reducido el domingo
        ];

        foreach ($shoppingCenters as $shoppingCenter) {
            // Insertamos los horarios para cada día de la semana
            foreach ($daysOfWeek as $day => $hours) {
                // Verificamos si ya existe un registro para este centro y día
                $exists = DB::table('opening_hours')
                    ->where('shopping_center_id', $shoppingCenter->id)
                    ->where('day_of_week', $day)
                    ->exists();

                if (!$exists) {
                    DB::table('opening_hours')->insert([
                        'id' => Str::uuid(),
                        'shopping_center_id' => $shoppingCenter->id,
                        'day_of_week' => $day,
                        'specific_date' => null,
                        'open_time' => $hours[0], // Hora de apertura
                        'close_time' => $hours[1], // Hora de cierre
                        'is_closed' => false,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            // Ejemplo de festivo cerrado (Navidad) para cada centro
            $this->insertHoliday($shoppingCenter->id, '2025-12-25', '00:00:00', '00:00:00', true);

            // Ejemplo de otro festivo con horarios especiales (Año Nuevo)
            $this->insertHoliday($shoppingCenter->id, '2025-01-01', '10:00:00', '18:00:00', false);
        }
    }

    /**
     * Inserta un festivo con horario especial o cerrado.
     *
     * @param string $shoppingCenterId
     * @param string $specificDate
     * @param string $openTime
     * @param string $closeTime
     * @param bool $isClosed
     * @return void
     */
    private function insertHoliday(string $ShoppingCenterID, string $specificDate, string $openTime, string $closeTime, bool $isClosed)
    {
        // Verificamos si ya existe un registro para este festivo
        $exists = DB::table('opening_hours')
            ->where('shopping_center_id', $ShoppingCenterID)
            ->where('specific_date', $specificDate)
            ->exists();

        if (!$exists) {
            DB::table('opening_hours')->insert([
                'id' => Str::uuid(),
                'shopping_center_id' => $ShoppingCenterID,
                'day_of_week' => null, // Día no relevante para un festivo
                'specific_date' => Carbon::parse($specificDate), // Fecha específica
                'open_time' => $openTime,
                'close_time' => $closeTime,
                'is_closed' => $isClosed,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
