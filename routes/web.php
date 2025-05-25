<?php

use Illuminate\Support\Facades\Route;
use App\Rankings\Controllers\RankingController;
use App\Http\Controllers\UserController;
use App\Store\Controllers\StoreController;
use App\Parking\Controllers\ParkingController;
use Inertia\Inertia;
use App\Events\Controllers\EventController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', \App\Users\Controllers\UserController::class);
    Route::resource('floors', \App\Floors\Controller\FloorController::class);
    Route::resource('zones', \App\Zones\Controllers\ZoneController::class);
    Route::resource('bookcases', \App\Bookcases\Controllers\BookcaseController::class);
    Route::resource('books', \App\Books\Controllers\BookController::class);
    Route::resource('loans', \App\Loans\Controllers\LoanController::class);

    // Rutas para stores
    Route::prefix('shopping-center/{shoppingCenter}')->group(function () {
        Route::get('stores', [StoreController::class, 'index'])
            ->name('shopping-centers.stores.index');
    });
    Route::resource('stores', StoreController::class)->only(['show', 'destroy']);

    // Página de Parking (Inertia)
    Route::get('/shopping-center/{shoppingCenter}/parking', [ParkingController::class, 'index'])
         ->name('parking.index');

    // Endpoint para crear una reserva de parking
   
});

// Rutas públicas
Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{id}', [EventController::class, 'show'])->name('events.show');
Route::get('/shopping-center/{id}/events', [EventController::class, 'centerEvents'])
     ->name('shopping-center.events');

// Ranking y timeline (con o sin auth según tu lógica)
Route::middleware(['auth', 'verified'])->get('/ranking', [RankingController::class, 'index'])
     ->name('ranking.index');
Route::get('/users/{user}/timeline', [UserController::class, 'show'])
     ->name('users.timeline');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
