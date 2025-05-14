<?php

use App\Http\Controllers\Api\UserApiController;
use App\Http\Controllers\Api\FloorApiController;
use App\Zones\Controllers\Api\ZoneApiController; 
use App\Bookcases\Controllers\Api\BookcaseApiController; 
use App\Reservations\Controllers\Api\ReservationApiController; 
use App\Books\Controllers\Api\BookApiController;  
use App\Loans\Controllers\Api\LoanApiController; 
use Illuminate\Support\Facades\Route;
use App\ShoppingCenter\Controllers\ShoppingCenterController;

Route::middleware(['web', 'auth'])->group(function () {

    // Rutas de Centros Comerciales
    Route::get('/shopping-centers', [ShoppingCenterController::class, 'index']);
    // Rutas de Usuario
    Route::get('/users', [UserApiController::class, 'index']);
    Route::get('/users/{user}', [UserApiController::class, 'show']);
    Route::post('/users', [UserApiController::class, 'store']);
    Route::put('/users/{user}', [UserApiController::class, 'update']);
    Route::delete('/users/{user}', [UserApiController::class, 'destroy']);
    
    // Rutas de Piso
    Route::get('/floors', [FloorApiController::class, 'index']);  
    Route::get('/floors/{floor}', [FloorApiController::class, 'show']); 
    Route::post('/floors', [FloorApiController::class, 'store']);  
    Route::put('/floors/{floor}', [FloorApiController::class, 'update']);  
    Route::delete('/floors/{floor}', [FloorApiController::class, 'destroy']); 

    // Rutas de Zona
    Route::get('/zones', [ZoneApiController::class, 'index']);  
    Route::get('/zones/{zone}', [ZoneApiController::class, 'show']); 
    Route::post('/zones', [ZoneApiController::class, 'store']);  
    Route::put('/zones/{zone}', [ZoneApiController::class, 'update']);  
    Route::delete('/zones/{zone}', [ZoneApiController::class, 'destroy']); 

    // Rutas de Estanterias
    Route::get('/bookcases', [BookcaseApiController::class, 'index']);  
    Route::get('/bookcases/{bookcase}', [BookcaseApiController::class, 'show']); 
    Route::post('/bookcases', [BookcaseApiController::class, 'store']);  
    Route::put('/bookcases/{bookcase}', [BookcaseApiController::class, 'update']);  
    Route::delete('/bookcases/{bookcase}', [BookcaseApiController::class, 'destroy']); 

    // Rutas de Libros
    Route::get('/books', [BookApiController::class, 'index']);  
    Route::get('/books/{book}', [BookApiController::class, 'show']); 
    Route::post('/books', [BookApiController::class, 'store']);  
    Route::put('/books/{book}', [BookApiController::class, 'update']);  
    Route::delete('/books/{book}', [BookApiController::class, 'destroy']); 
    
    // Rutas de loans
    Route::get('/loans', [LoanApiController::class, 'index']);  
    Route::get('/loans/{loan}', [LoanApiController::class, 'show']); 
    Route::post('/loans', [LoanApiController::class, 'store']);  
    Route::put('/loans/{loan}', [LoanApiController::class, 'update']);  
    Route::delete('/loans/{loan}', [LoanApiController::class, 'destroy']); 

    Route::middleware(['web', 'auth'])->group(function () {
        Route::get('/reservations', [ReservationApiController::class, 'index']);
        Route::get('/reservations/{reservation}', [ReservationApiController::class, 'show']);
        Route::post('/reservations', [ReservationApiController::class, 'store']);
        Route::put('/reservations/{reservation}', [ReservationApiController::class, 'update']);
        Route::delete('/reservations/{reservation}', [ReservationApiController::class, 'destroy']);
    }); 

});
