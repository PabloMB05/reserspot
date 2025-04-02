<?php

namespace Domain\Bookcases\Models;

use Database\Factories\BookcaseFactory;
use Domain\Books\Models\Book;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bookcase extends Model
{
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return BookcaseFactory::new();
    }
    use HasUuids;
    use HasFactory;
    protected $fillable = [
        'id',
        'number',
        'capacity',
        'zone_id',
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }

    public function zone(): BelongsTo
    {
        return $this->belongsTo(Zone::class);
    }
}