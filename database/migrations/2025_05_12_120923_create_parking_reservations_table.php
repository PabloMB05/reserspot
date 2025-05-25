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
            $table->uuid('id')->primary()->unique();
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('parking_spot_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('shopping_center_id')->constrained()->onDelete('cascade');
            $table->date('date');       //  Fecha de la reserva
            $table->time('time');       //  Hora de la reserva
            $table->boolean('is_confirmed')->default(false); // Confirmación de la reserva
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
