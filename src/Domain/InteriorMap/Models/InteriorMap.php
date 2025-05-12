<?php

namespace Domain\InteriorMap\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InteriorMap extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'shopping_center_id',
        'map_url',
    ];

    public function shoppingCenter()
    {
        return $this->belongsTo(ShoppingCenter::class);
    }
}
