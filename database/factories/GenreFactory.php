<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Models\genre; // Asegúrate de que esta ruta sea correcta

class GenreFactory extends Factory
{
    protected $model = genre::class; // Asignamos el modelo correspondiente

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement([
                'Acción',
                'Aventura',
                'Ciencia Ficción',
                'Comedia',
                'Drama',
                'Fantasía',
                'Terror',
                'Misterio',
                'Romance',
                'Thriller',
            ]),
        ];
    }
}
