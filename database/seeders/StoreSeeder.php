<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Domain\ShoppingCenter\Models\ShoppingCenter;
use Domain\StoreCategory\Models\StoreCategory;

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
        if (!$category) {
            $this->command->warn('No hay categorías de tienda en la base de datos.');
            return;
        }

        // Insertar tienda
        DB::table('stores')->insert([
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