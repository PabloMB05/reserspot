<?php

namespace Domain\Event\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'shopping_center_id',
        'title',
        'description',
        'start_time',
        'end_time',
        'location',
    ];

    public function shoppingCenter()
    {
        return $this->belongsTo(ShoppingCenter::class);
    }
}
