<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Floor extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'shopping_center_id',
        'level', // Por ejemplo: 0, 1, 2 o -1 para sótano
        'name',  // Opcional: "Planta Baja", "Primer Piso"
    ];

    public function shoppingCenter()
    {
        return $this->belongsTo(ShoppingCenter::class);
    }

    public function storeLocations()
    {
        return $this->hasMany(StoreLocation::class);
    }

    public function parkingSpots()
    {
        return $this->hasMany(ParkingSpot::class);
    }
}
