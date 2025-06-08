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
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'status' => $this->is_confirmed ? 'confirmed' : 'pending',
            'created_at' => $this->created_at ? Carbon::parse($this->created_at)->format('Y-m-d H:i:s') : null,
            'expires_at' => $this->created_at ? Carbon::parse($this->created_at)->addMinutes(15)->format('Y-m-d H:i:s') : null,
            'price' => $this->calculatePrice(),
        ];
    }

    protected function calculatePrice()
    {
        if (!$this->start_time || !$this->end_time || !$this->date) {
            return 0.00;
        }

        $start = Carbon::parse($this->date . ' ' . $this->start_time);
        $end = Carbon::parse($this->date . ' ' . $this->end_time);

        // Asegurarse de que la hora de salida sea posterior
        if ($end->lessThanOrEqualTo($start)) {
            return 0.00;
        }

        $durationInHours = ceil($end->diffInMinutes($start) / 60);

        return $durationInHours * 2.00;
    }
}
