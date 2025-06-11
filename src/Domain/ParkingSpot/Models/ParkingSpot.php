<?php

namespace Domain\ParkingSpot\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Zone\Models\Zone;

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

    public function floor()
    {
        return $this->belongsTo(Floor::class, 'level', 'level'); // si level es clave
    }
    public function reservation()
    {
        return $this->hasOne(Reservation::class);
    }
}
