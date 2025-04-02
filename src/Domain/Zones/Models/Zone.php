<?php

namespace Domain\Zones\Models;

use Database\Factories\ZoneFactory;
use Domain\Models\floors\Floor;
use Domain\Bookcases\Models\Bookcase;
use Domain\Genres\Models\Genre;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Zone extends Model
{
    use HasUuids;
    use HasFactory;

    protected static function newFactory()
    {
        return ZoneFactory::new();
    }

    protected $fillable = [
        'id',
        'number',
        'genre_name',
        'capacity',
        'floor_id',
    ];

    public function bookcases(): HasMany
    {
        return $this->hasMany(Bookcase::class);
    }

    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class, 'genre_name', 'name');
    }

    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class);
    }
}