<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Models\zones\zone;
use Domain\Models\floors\floor;


class ZoneFactory extends Factory
{
    protected $model = zone::class;

    public function definition(): array
    {
        $floor = floor::all()->random();
        return [
            'name' => $this->faker->unique()->word(),
            'capacity' => $this->faker->numberBetween(10, 500),
            'floor_uuid' => $floor->id,
        ];
    }
}
