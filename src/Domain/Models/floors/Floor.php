<?php

namespace Domain\Models\floors; 

use Database\Factories\FloorFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany; 
use Domain\Zones\Models\Zone; 

class Floor extends Model
{
    protected static function newFactory()
    {
        return FloorFactory::new();
    }
    use HasUuids;
    use HasFactory;

    protected $fillable = [
        'id',
        'floor_number',
        'capacity',
    ];
    public function zones(): HasMany
    {
        return $this->hasMany(Zone::class);
    }
}