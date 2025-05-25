<?php

namespace Domain\ParkingReservation\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\ParkingSpot;
use App\Models\ShoppingCenter;

class ParkingReservation extends Model
{
    protected $table = 'parking_reservations';

    public $incrementing = false; // Usas UUID
    protected $keyType = 'string'; // UUID es string

    protected $fillable = [
        'id',
        'user_id',
        'parking_spot_id',
        'shopping_center_id',
        'reserved_at',
        'is_confirmed',
    ];

protected $casts = [
    'date' => 'date',
    'time' => 'string', // o 'datetime:H:i' si quieres un cast especial (pero string está bien)
    'is_confirmed' => 'boolean',
];


    // Relaciones

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function parkingSpot(): BelongsTo
    {
        return $this->belongsTo(ParkingSpot::class);
    }

    public function shoppingCenter(): BelongsTo
    {
        return $this->belongsTo(ShoppingCenter::class);
    }
}
