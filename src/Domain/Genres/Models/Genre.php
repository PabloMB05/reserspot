<?php

namespace Domain\Genres\Models;

use Database\Factories\GenreFactory;
use Domain\Books\Models\Book;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Genre extends Model
{
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return GenreFactory::new();
    }
    use HasUuids;
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
    ];

    public function bookcases(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_genre', 'genre_id', 'book_id');
    }

    public function zone(): BelongsTo
    {
        return $this->belongsTo(Zone::class);
    }
}