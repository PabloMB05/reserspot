<?php

namespace Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Database\Factories\GenreFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids; 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany; 
use Domain\Models\bookshelf\bookshelf; 
use Domain\Models\books\book; 

class genre extends Model
{
    use HasUuids, HasFactory;
    protected $fillable = [
        'name',
    ];

    protected static function newFactory()
    {
        return GenreFactory::new(); 
    }


}
