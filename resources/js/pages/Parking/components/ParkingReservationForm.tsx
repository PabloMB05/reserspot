import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface ParkingReservationFormProps {
  spot: {
    id: string;
    spot_number: string;
    is_occupied: boolean;
  } | null;
  shoppingCenter: {
    id: string;
    name: string;
  };
}

export function ParkingReservationForm({ spot, shoppingCenter }: ParkingReservationFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");


  const handleReservation = async () => {
    if (!spot || !date || !time) return;

    const payload = {
      parking_spot_id: spot.id,
      shopping_center_id: shoppingCenter.id,
      date: date.toISOString().split('T')[0], // "YYYY-MM-DD"
      time: time + ':00', // "HH:mm:ss"
    };

    try {
      const response = await fetch('/api/parking-reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Descomenta si usas token
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error('Error al reservar plaza');
      }

      const data = await response.json();
      alert('Reserva confirmada 🎉');
      console.log(data);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
      console.error(error);
    }
  };

  if (!spot) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">Selecciona una plaza para reservar</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-h-[80vh] overflow-auto">
      <h3 className="font-semibold text-lg mb-4">Reservar Plaza</h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Centro Comercial:</p>
          <p className="font-medium">{shoppingCenter.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Plaza:</p>
          <p className="font-medium">{spot.spot_number}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Estado:</p>
          <p className={`font-medium ${spot.is_occupied ? "text-red-600" : "text-green-600"}`}>
            {spot.is_occupied ? "Ocupada" : "Disponible"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Fecha:</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: es }) : <span>Elegir fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={es}
                initialFocus
                disabled={(d) => d < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Hora:</p>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            {Array.from({ length: 24 }, (_, i) => {
              const hour = i.toString().padStart(2, "0");
              return [`${hour}:00`, `${hour}:30`];
            })
              .flat()
              .map((timeOption, index) => (
                <option key={`${timeOption}-${index}`} value={timeOption}>
                  {timeOption}
                </option>
              ))}
          </select>
        </div>

        <Button
          className="w-full mt-4"
          disabled={spot.is_occupied}
          onClick={handleReservation}
        >
          Reservar Plaza
        </Button>
      </div>
    </div>
  );
}
