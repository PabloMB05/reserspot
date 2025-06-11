<?php

use App\Http\Controllers\Api\UserApiController;
use App\Http\Controllers\Api\FloorApiController;
use App\Zones\Controllers\Api\ZoneApiController; 
use App\Bookcases\Controllers\Api\BookcaseApiController; 
use App\Reservations\Controllers\Api\ReservationApiController; 
use App\Stores\Controllers\Api\StoreApiController;
use App\Books\Controllers\Api\BookApiController;  
use App\Loans\Controllers\Api\LoanApiController; 
use Illuminate\Support\Facades\Route;
use App\ShoppingCenter\Controllers\ShoppingCenterController;
use App\ParkingReservation\Controllers\ParkingReservationController;

// Rutas que requieren autenticación web tradicional
Route::middleware(['web', 'auth'])->group(function () {
    // Rutas de Centros Comerciales
    Route::get('/shopping-centers', [ShoppingCenterController::class, 'index']);
    
    // Rutas de Usuario
    Route::apiResource('users', UserApiController::class)->except(['create', 'edit']);
    
    // Rutas de Piso
    Route::apiResource('floors', FloorApiController::class)->except(['create', 'edit']);
    
    // Rutas de Zona
    Route::apiResource('zones', ZoneApiController::class)->except(['create', 'edit']);
    
    // Rutas de Estanterías
    Route::apiResource('bookcases', BookcaseApiController::class)->except(['create', 'edit']);
    
    // Rutas de Libros
    Route::apiResource('books', BookApiController::class)->except(['create', 'edit']);
    
    // Rutas de Préstamos
    Route::apiResource('loans', LoanApiController::class)->except(['create', 'edit']);
    
    // Rutas de Tiendas
    Route::get('/shopping-center/{shoppingCenter}/stores', [StoreApiController::class, 'index']);
    
    // Rutas de Reservaciones
    Route::apiResource('reservations', ReservationApiController::class)->only(['show', 'update', 'destroy']);
});

// Rutas API que requieren autenticación Sanctum
Route::middleware(['web', 'auth'])->group(function () {
    // Rutas para reservas de parking
    Route::prefix('parking-reservations')->name('parking-reservations.')->group(function () {
        Route::get('/', [ParkingReservationController::class, 'index'])->name('index');
        Route::post('/', [ParkingReservationController::class, 'store'])->name('store');
        Route::post('/check-availability', [ParkingReservationController::class, 'checkAvailability'])->name('check-availability');
        Route::post('/{reservation}/confirm', [ParkingReservationController::class, 'confirm'])->name('confirm');
        Route::delete('/{reservation}', [ParkingReservationController::class, 'cancel'])->name('cancel');
        Route::get('/history', [ParkingReservationController::class, 'history'])->name('history');
        Route::delete('/{reservation}/destroy', [ParkingReservationController::class, 'destroy'])
            ->name('destroy')
            ->where('reservation', '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}');
    });
});