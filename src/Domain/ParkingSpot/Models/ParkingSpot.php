<?php

namespace Domain\ParkingSpot\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Zone\Models\Zone;
use Domain\Floor\Models\Floor;
use Domain\Reservation\Models\Reservation;

class ParkingSpot extends Model
{
    use HasFactory, HasUuids;

    // Indica que la clave primaria no es autoincremental y es de tipo string (UUID)
    public $incrementing = false;
    protected $keyType = 'string';

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
    public function floor()
    {
        return $this->belongsTo(Floor::class);
    }

}
