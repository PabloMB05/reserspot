<?php

namespace Domain\Models\floors; 

use Database\Factories\FloorFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany; 
use Domain\Models\zones\zone; 

class Floor extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'floor_number',
        'capacity',
    ];

    protected static function newFactory()
    {
        return FloorFactory::new(); 
    }

    public function zones(): HasMany
    {
        return $this->hasMany(zone::class); 
    }
}
