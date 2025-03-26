<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class book extends Model
{
    protected $fillable = [
        'uuid',
        'name',
        'title',
        'autor',
        'isbn',
        'genre',
        
    ];
}
