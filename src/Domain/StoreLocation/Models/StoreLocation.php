<?php

namespace Domain\StoreLocation\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'store_id',
        'floor_id',
        'zone',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function floor()
    {
        return $this->belongsTo(Floor::class);
    }
}
