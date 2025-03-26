<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class BookShelfFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $genre = genre::all()->random();
        return [
            'number_bookshelf' => $this->faker->unique()->numberBetween(1, 50),
            'capacity' => $this->faker->numberBetween(10, 500),
            'genre' => $genre->name;
        ];
    }
}
