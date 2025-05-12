<?php

namespace Domain\StoreCategory\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
    ];

    public function stores()
    {
        return $this->hasMany(Store::class);
    }
}
