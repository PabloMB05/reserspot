<?php

use Illuminate\Support\Facades\Route;
use App\Rankings\Controllers\RankingController;
use App\Http\Controllers\UserController;
use Inertia\Inertia;

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
    Route::resource('reservations', \App\Reservations\Controllers\ReservationController::class);
});
Route::middleware(['auth', 'verified'])->get('/ranking', [RankingController::class, 'index'])->name('ranking.index');
Route::get('/users/{user}/timeline', [UserController::class, 'show'])->name('users.timeline')->name('TimeLine{user->name}');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
