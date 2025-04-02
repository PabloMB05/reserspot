<?php
namespace Database\Factories;

use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Models\Book;
use Domain\Genres\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition()
    {
        $genres=Genre::all()->pluck('name')->toArray();
        $genresArray=fake()->randomElements($array=$genres, $count=fake()->numberBetween(1, 2));

        $bookcase = Bookcase::all()->random()->id;

        return [

            'title' => $this->faker->name,
            'author' => $this->faker->name,
            'genres'=>implode(', ', $genresArray),
            'length' => $this->faker->numberBetween(300, 900),
            'editor' => $this->faker->name,
            'bookcase_id' => $bookcase,

        ];
    }
}