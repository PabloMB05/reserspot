<?php

namespace Database\Factories;

use Domain\Models\floors\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;

class ZoneFactory extends Factory
{
    protected $model = Zone::class;

    public function definition()
    {
        // Obtener un género aleatorio o crearlo si no existe
        $genre = Genre::inRandomOrder()->first() ?? Genre::factory()->create();

        return [
            'id' => fake()->uuid(),
            'number' => fake()->numberBetween(1, 100),
            'genre_name' => $genre->name, // Referencia al nombre del género
            'capacity' => fake()->numberBetween(10, 50),
            'floor_id' => Floor::inRandomOrder()->first()->id ?? Floor::factory()->create()->id,
        ];
    }
}
