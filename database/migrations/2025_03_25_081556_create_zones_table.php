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
        Schema::create('zones', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->integer('number');
            $table->string('genre_name');
            $table->foreign('genre_name')->references('name')->on('genres')->cascadeOnDelete();
            $table->integer('capacity');
            $table->foreignUuid('floor_id')->constrained(table:'floors', indexName:'id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zones');
    }
};