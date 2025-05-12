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
        Schema::create('opening_hours', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->foreignId('shopping_center_id')->constrained()->onDelete('cascade');
            $table->enum('day_of_week', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])->nullable();
            $table->date('specific_date')->nullable(); // Para días festivos u horarios especiales
            $table->time('open_time');
            $table->time('close_time');
            $table->boolean('is_closed')->default(false); // Por ejemplo, cerrado en festivo
            $table->timestamps();

            $table->unique(['shopping_center_id', 'day_of_week', 'specific_date'], 'unique_opening');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opening_hours');
    }
};
