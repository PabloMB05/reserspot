<?php

namespace Domain\ShoppingCenter\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingCenter extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'location', // Dirección del centro comercial
    ];

    public function stores()
    {
        return $this->hasMany(Store::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function openingHours()
    {
        return $this->hasMany(OpeningHour::class);
    }

    public function interiorMaps()
    {
        return $this->hasMany(InteriorMap::class);
    }
}
