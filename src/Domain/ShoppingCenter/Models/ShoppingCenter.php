<?php

namespace Domain\ShoppingCenter\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Domain\OpeningHour\Models\OpeningHour;
use Illuminate\Support\Str;

class ShoppingCenter extends Model
{
    use HasFactory;

    public $incrementing = false;       // Para usar UUID
    protected $keyType = 'string';      // Tipo de la clave primaria

    protected $fillable = [
        'id',
        'name',
        'location', // Dirección del centro comercial
    ];

    // Asigna un UUID automáticamente al crear
    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    // Relaciones
    public function stores()
    {
        return $this->hasMany(Store::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function openingHours()
    {
        return $this->hasMany(OpeningHour::class);
    }

    public function interiorMaps()
    {
        return $this->hasMany(InteriorMap::class);
    }
}
