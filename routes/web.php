<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Users\Controllers\UserController;
use App\Store\Controllers\StoreController;
use App\Parking\Controllers\ParkingController;
use App\ParkingReservation\Controllers\ParkingReservationController;
use App\Events\Controllers\EventController;
use App\Rankings\Controllers\RankingController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas públicas
Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{id}', [EventController::class, 'show'])->name('events.show');
Route::get('/shopping-center/{id}/events', [EventController::class, 'centerEvents'])->name('shopping-center.events');

// Timeline pública (sin login)
Route::get('/users/{user}/timeline', [UserController::class, 'show'])->name('users.timeline');

// Rutas protegidas (requieren login y verificación)
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', \App\Users\Controllers\UserController::class);
    Route::resource('floors', \App\Floors\Controller\FloorController::class);
    Route::resource('zones', \App\Zones\Controllers\ZoneController::class);
    Route::resource('bookcases', \App\Bookcases\Controllers\BookcaseController::class);
    Route::resource('books', \App\Books\Controllers\BookController::class);
    Route::resource('loans', \App\Loans\Controllers\LoanController::class);

    // Tiendas por centro comercial
    Route::prefix('shopping-center/{shoppingCenter}')->group(function () {
        Route::get('stores', [StoreController::class, 'index'])->name('shopping-centers.stores.index');
        Route::get('parking', [ParkingController::class, 'index'])->name('parking.index');
    });
    Route::resource('stores', StoreController::class)->only(['show', 'destroy']);

    // Rutas de reservas de parking (POST)
    Route::post('/reservas', [ParkingReservationController::class, 'store'])->name('reservas');
    Route::post('/api/parking-reservations', [ParkingReservationController::class, 'store']);
    Route::post('/api/parking-reservations/check-availability', [ParkingReservationController::class, 'checkAvailability']);
    
    // Ranking
    Route::get('/ranking', [RankingController::class, 'index'])->name('ranking.index');
    Route::get('/users/{user}/parking-history', [UserController::class, 'parkingHistory'])->name('users.parking-history');

    Route::get('/dashboard/reservas/{id}', [\App\ParkingReservation\Controllers\ParkingReservationController::class, 'show'])
    ->middleware(['auth'])
    ->name('reservas.show');

});

// Otros archivos de rutas
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
