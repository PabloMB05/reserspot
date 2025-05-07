<?php

namespace App\Rankings\Controllers;

use App\Core\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Domain\Zones\Models\Zone;

class RankingController extends Controller
{
    public function index()
    {
        $lang = Auth::user()->settings?->preferences['locale'] ?? 'en';

        // Libros más reservados y prestados
        $ranking = DB::table('books')
            ->leftJoin('reservations', 'books.id', '=', 'reservations.book_id')
            ->leftJoin('loans', 'books.id', '=', 'loans.book_id')
            ->whereNull('books.deleted_at')
            ->select(
                'books.title',
                'books.isbn',
                DB::raw('COUNT(DISTINCT reservations.id) as total_reservations'),
                DB::raw('COUNT(DISTINCT loans.id) as total_loans')
            )
            ->groupBy('books.id', 'books.title', 'books.isbn')
            ->orderByDesc(DB::raw('COUNT(DISTINCT loans.id)'))
            ->limit(10)
            ->get();

        // Usuarios más activos
            $userRanking = User::select('users.name')
            ->selectRaw('
                COUNT(DISTINCT reservations.id) AS total_reservations,
                COUNT(DISTINCT loans.id) AS total_loans,
                COUNT(DISTINCT reservations.id) + COUNT(DISTINCT loans.id) AS total_actions
            ')
            ->leftJoin('reservations', 'users.id', '=', 'reservations.user_id')
            ->leftJoin('loans', 'users.id', '=', 'loans.user_id')
            ->whereNull('users.deleted_at')
            ->groupBy('users.id', 'users.name')
            ->orderByDesc('total_actions')
            ->limit(10)
            ->get();
    

        // Zonas con más movimiento
        $zoneRanking = DB::table('zones')
        ->leftJoin('floors', 'zones.floor_id', '=', 'floors.id')
        ->leftJoin('bookcases', 'zones.id', '=', 'bookcases.zone_id')
        ->leftJoin('books', 'bookcases.id', '=', 'books.bookcase_id')
        ->leftJoin('reservations', 'books.id', '=', 'reservations.book_id')
        ->leftJoin('loans', 'books.id', '=', 'loans.book_id')
        ->whereNull('books.deleted_at')
        ->select(
            'zones.id',
            'zones.number as name',
            'floors.id as floor_id',
            'floors.floor_number as floor_name',
            DB::raw("STRING_AGG(DISTINCT bookcases.id::text, ',') as bookcase_ids"),
            DB::raw('COUNT(DISTINCT reservations.id) as total_reservations'),
            DB::raw('COUNT(DISTINCT loans.id) as total_loans'),
            DB::raw('COUNT(DISTINCT reservations.id) + COUNT(DISTINCT loans.id) as total_actions')
        )
        ->groupBy('zones.id', 'zones.number', 'floors.id', 'floors.floor_number')
        ->orderByDesc('total_actions')
        ->limit(10)
        ->get();
    
    
        
        return Inertia::render('Rankings/Index', [
            'lang' => $lang,
            'ranking' => $ranking,
            'userRanking' => $userRanking,
            'zoneRanking' => $zoneRanking,
        ]);
    }
}
