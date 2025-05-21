<?php

namespace Domain\Stores\Models;

use Illuminate\Database\Eloquent\Model;
use Domain\ShoppingCenter\Models\ShoppingCenter;
use Domain\StoreCategory\Models\StoreCategory;

class Store extends Model
{
    protected $fillable = [
        'name',
        'website',
        'email',
        'phone',
        'shopping_center_id',
        'store_category_id'
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
        // En el modelo Store
    public function scopeForShoppingCenter($query, string $ShoppingCenterID)
    {
        return $query->where('shopping_center_id', $ShoppingCenterID);
    }


}