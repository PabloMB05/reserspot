<?php

namespace Domain\Notification\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'title',
        'message',
        'is_read',
        'sent_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
