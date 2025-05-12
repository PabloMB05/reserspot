<?php

namespace Domain\Zone\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Zone extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'floor_id',
        'name',
    ];

    protected static function booted()
    {
        static::creating(function ($zone) {
            $zone->id = (string) Str::uuid();
        });
    }

    public function floor()
    {
        return $this->belongsTo(Floor::class);
    }

    public function parkingSpots()
    {
        return $this->hasMany(ParkingSpot::class);
    }
}
