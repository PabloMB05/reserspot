<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('parking_reservations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('parking_spot_id');
            $table->uuid('shopping_center_id');

            // Campos separados para fecha y hora
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time');

            // Campos necesarios para verificar conflictos
            $table->timestamp('reserved_at')->nullable();     // <- Añadido
            $table->timestamp('reserved_until')->nullable();

            $table->boolean('is_confirmed')->default(false);
            $table->timestamps();
            $table->softDeletes(); // Por si estás usando SoftDeletes
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parking_reservations');
    }
};
