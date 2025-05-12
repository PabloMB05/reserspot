<?php

namespace Domain\OpeningHour\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OpeningHour extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'shopping_center_id',
        'day_of_week',
        'specific_date',
        'open_time',
        'close_time',
        'is_closed',
    ];

    public function shoppingCenter()
    {
        return $this->belongsTo(ShoppingCenter::class);
    }
}
