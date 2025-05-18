<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Crea la tabla 'zones' con una clave primaria UUID, una relación con la tabla 'floors'
     * y una columna para el nombre de la zona.
     */
    public function up(): void
    {
        Schema::create('zones', function (Blueprint $table) {
            // Define la clave primaria UUID
            $table->uuid('id')->primary()->unique(); 

            // Relación con la tabla 'floors'
            $table->foreignUuid('floor_id')
                ->constrained() // Constrained hace referencia a la columna 'id' de la tabla 'floors'
                ->onDelete('cascade'); // Si se elimina un 'floor', las zonas asociadas también se eliminarán.

            // Columna para el nombre de la zona
            $table->string('name'); // Ej: Zona Norte

            // Timestamps para seguimiento de creación y actualización
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * Elimina la tabla 'zones'.
     */
    public function down(): void
    {
        Schema::dropIfExists('zones');
    }
};
