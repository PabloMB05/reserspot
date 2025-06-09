<?php

namespace Domain\ParkingReservation\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Domain\Models\User;
use Domain\ParkingSpot\Models\ParkingSpot;
use Domain\ShoppingCenter\Models\ShoppingCenter;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class ParkingReservation extends Model
{
    use SoftDeletes;

    protected $table = 'parking_reservations';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_id',
        'parking_spot_id',
        'shopping_center_id',
        'reserved_at',
        'reserved_until',
        'is_confirmed',
        'date',
        'start_time',
        'end_time',
    ];

    protected $casts = [
        'reserved_at' => 'datetime',
        'reserved_until' => 'datetime',
        'date' => 'date',
        'start_time' => 'datetime:H:i:s',
        'end_time' => 'datetime:H:i:s',
        'is_confirmed' => 'boolean',
    ];

    // Relaciones
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function parkingSpot(): BelongsTo
    {
        return $this->belongsTo(ParkingSpot::class);
    }

    public function shoppingCenter(): BelongsTo
    {
        return $this->belongsTo(ShoppingCenter::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_confirmed', true)
                     ->where('reserved_until', '>=', now());
    }

    // Métodos
    public function isExpired(): bool
    {
        return !$this->is_confirmed &&
               $this->created_at->addMinutes(15)->isPast();
    }

    public function getDurationHours(): int
    {
        return $this->reserved_until->diffInHours($this->reserved_at);
    }

    public function getExpeditAttribute(): ?string
    {
        return $this->reserved_at?->toDateTimeString();
    }
}
