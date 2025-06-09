<?php

namespace Domain\ParkingReservation\Data\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ParkingReservationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,

            'parking_spot' => [
                'id' => optional($this->parkingSpot)->id,
                'number' => optional($this->parkingSpot)->spot_number,
            ],

            'shopping_center' => [
                'id' => optional($this->shoppingCenter)->id,
                'name' => optional($this->shoppingCenter)->name,
            ],

            'date' => $this->date ? Carbon::parse($this->date)->format('Y-m-d') : null,

            'start_time' => $this->start_time ? Carbon::parse($this->start_time)->format('H:i') : null,
            'end_time'   => $this->end_time   ? Carbon::parse($this->end_time)->format('H:i') : null,

            'status' => $this->is_confirmed ? 'confirmed' : 'pending',

            'created_at' => $this->created_at
                ? $this->created_at->format('Y-m-d H:i:s')
                : null,

            'expires_at' => $this->created_at
                ? $this->created_at->copy()->addMinutes(15)->format('Y-m-d H:i:s')
                : null,

            'price' => $this->calculatePrice(),

            // Opcional: incluir reserva completa para debugging o compatibilidad legacy
            'reserved_at' => optional($this->reserved_at)->toDateTimeString(),
            'reserved_until' => optional($this->reserved_until)->toDateTimeString(),
        ];
    }

    protected function calculatePrice(): float
    {
        if (!$this->start_time || !$this->end_time || !$this->date) {
            return 0.00;
        }

        try {
            $start = Carbon::parse($this->date . ' ' . $this->start_time);
            $end = Carbon::parse($this->date . ' ' . $this->end_time);
        } catch (\Exception $e) {
            return 0.00;
        }

        if ($end->lessThanOrEqualTo($start)) {
            return 0.00;
        }

        $durationInHours = ceil($end->diffInMinutes($start) / 60);
        return $durationInHours * 2.00;
    }
}
