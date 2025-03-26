<?php

namespace Domain\Models\zones;

use Database\Factories\ZoneFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany; 
use Domain\Models\bookshelf\bookshelf; 

class zone extends Model
{
    use HasUuids, HasFactory;
    
    protected $fillable = [
        'name',
        'capacity',
    ];
    protected static function newFactory()
    {
        return ZoneFactory::new(); 
    }

    public function bookshelf(): HasMany
    {
        return $this->hasMany(bookshelf::class); 
    }
}
