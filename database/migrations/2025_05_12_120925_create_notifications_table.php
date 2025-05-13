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
        Schema::create('notifications', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade'); // Notificación enviada a un usuario específico
            $table->string('title'); // Título de la notificación
            $table->text('message'); // Mensaje de la notificación
            $table->boolean('is_read')->default(false); // Si el usuario ha leído la notificación
            $table->timestamp('sent_at')->nullable(); // Fecha en la que se envió la notificación
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
