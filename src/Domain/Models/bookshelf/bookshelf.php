<?php

namespace Domain\Models;

use Database\Factories\BookShelfFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany; 
use Domain\Models\books\book; 

class bookshelf extends Model
{
    use HasUuids, HasFactory;
     
    protected $fillable = [
        'number_bookshelf',
        'capacity',
        'genre',
    ];
    protected static function newFactory()
    {
        return BookShelfFactory::new(); 
    }

    public function book(): HasMany
    {
        return $this->hasMany(book::class); 
    }
}
