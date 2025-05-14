<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StoreCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Categorías de ejemplo
        $categories = [
            'Ropa',
            'Electrónica',
            'Juguetes',
            'Alimentos',
            'Deportes',
            'Hogar',
            'Salud y Belleza',
            'Tecnología',
            'Libros y Papelería',
            'Accesorios',
        ];

        // Insertar las categorías en la tabla 'store_categories'
        foreach ($categories as $category) {
            DB::table('store_categories')->insert([
                'id' => Str::uuid(), // Generar un ID único para cada categoría
                'name' => $category, // Nombre de la categoría
                'created_at' => now(), // Marca de tiempo de creación
                'updated_at' => now(), // Marca de tiempo de actualización
            ]);
        }

        $this->command->info('Categorías de tienda creadas exitosamente.');
    }
}
