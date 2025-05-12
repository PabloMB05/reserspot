<?php

namespace Domain\Store\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'website',
        'email',
        'phone',
        'shopping_center_id',
        'store_category_id',
    ];

    public function shoppingCenter()
    {
        return $this->belongsTo(ShoppingCenter::class);
    }

    public function storeCategory()
    {
        return $this->belongsTo(StoreCategory::class);
    }

    public function storeLocations()
    {
        return $this->hasMany(StoreLocation::class);
    }
}
