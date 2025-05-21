<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Domain\ShoppingCenter\Models\ShoppingCenter;
use Domain\StoreCategory\Models\StoreCategory;
use Domain\Stores\Models\Store;

class StoreSeeder extends Seeder
{
    public function run(): void
    {
        // Obtener primer centro comercial
        $shoppingCenter = ShoppingCenter::first();
        if (!$shoppingCenter) {
            $this->command->warn('No hay centros comerciales en la base de datos.');
            return;
        }

        // Obtener una categoría de tienda existente
        $category = StoreCategory::first();
        if (!$category || !Str::isUuid($category->id)) {
            $this->command->warn('No hay una categoría de tienda válida en la base de datos.');
            return;
        }

        // Crear tienda usando Eloquent
        Store::create([
            'id' => Str::uuid(),
            'shopping_center_id' => $shoppingCenter->id,
            'store_category_id' => $category->id,
            'name' => 'Zara',
            'website' => 'https://www.zara.com',
            'email' => 'zara@example.com',
            'phone' => '+34 665387581',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
