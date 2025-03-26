<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Models\floors\floor;


class FloorFactory extends Factory
{
    protected $model = floor::class;

    public function definition(): array
    {
        return [
            'floor_number' => $this->faker->unique()->numberBetween(1, 50),
            'capacity' => $this->faker->numberBetween(10, 500),

        ];
    }
}
