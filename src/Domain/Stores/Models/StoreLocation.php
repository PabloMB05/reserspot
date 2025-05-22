<?php

namespace Domain\Stores\Models;

use Illuminate\Database\Eloquent\Model;
use Domain\Stores\Models\Store;

class StoreLocation extends Model
{
    protected $fillable = [
        'store_id',
        'floor',
        'unit_number', // Ejemplo: número o código de local dentro del piso
        'description', // Opcional, descripción o notas
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
