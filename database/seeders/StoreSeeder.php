<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Domain\ShoppingCenter\Models\ShoppingCenter;
use Domain\StoreCategory\Models\StoreCategory;
use Domain\Stores\Models\Store;
use Faker\Factory as Faker;

class StoreSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $shoppingCenter = ShoppingCenter::first();
        if (!$shoppingCenter) {
            $this->command->warn('No hay centros comerciales en la base de datos.');
            return;
        }

        $categories = StoreCategory::all();
        if ($categories->isEmpty()) {
            $this->command->warn('No hay categorías de tiendas en la base de datos.');
            return;
        }

        for ($i = 0; $i < 10; $i++) {
            $category = $categories->random();

            Store::create([
                'id' => Str::uuid(),
                'shopping_center_id' => $shoppingCenter->id,
                'store_category_id' => $category->id,
                'name' => $faker->company,
                'website' => $faker->url,
                'email' => $faker->companyEmail,
                'phone' => $faker->phoneNumber,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('Se crearon 10 tiendas con éxito.');
    }
}
