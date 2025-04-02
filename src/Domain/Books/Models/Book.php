<?php

namespace Domain\Books\Models;

use Database\Factories\BookFactory;
use Domain\Bookcases\Models\Bookcase;
use Domain\Genres\Models\Genre;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Book extends Model
{
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return BookFactory::new();
    }
    use HasUuids;
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'genres',
        'author',
        'length',
        'editor',
        'bookcase_id',
    ];

    public function bookcase(): BelongsTo
    {
        return $this->belongsTo(Bookcase::class);
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_genre', 'book_id', 'genre_id');
    }
}