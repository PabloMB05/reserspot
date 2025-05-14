<?php

namespace Domain\OpeningHour\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// app/Domain/ShoppingCenter/Models/OpeningHour.php

namespace Domain\OpeningHour\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OpeningHour extends Model
{
    protected $fillable = [
        'shopping_center_id',
        'day_of_week',
        'specific_date',
        'open_time',
        'close_time',
        'is_closed',
    ];

    public function shoppingCenter(): BelongsTo
    {
        return $this->belongsTo(ShoppingCenter::class);
    }
}

