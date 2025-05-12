<?php

namespace Domain\ParkingSpot\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParkingSpot extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'zone_id',
        'spot_number',
        'is_occupied',
    ];

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    public function reservation()
    {
        return $this->hasOne(Reservation::class);
    }
}
