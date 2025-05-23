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
        Schema::create('store_locations', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->foreignUuid('store_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('floor_id')->constrained()->onDelete('cascade');
            $table->string('zone'); // Ej: Norte, Sur, Centro
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_locations');
    }
};
