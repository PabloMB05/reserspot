import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale';
import { format, differenceInHours, parseISO } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';


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
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('13:00');

  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Función para construir ISO string combinado de fecha + hora
  const combineDateAndTime = (date: Date, time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);
    return combined.toISOString();
  };

  // Calcular horas reservadas y precio (€2/hora)
  const calculatePrice = (start: Date, end: Date) => {
    const hours = differenceInHours(end, start);
    return hours > 0 ? hours * 2 : 0;
  };

  useEffect(() => {
    if (spot && startDate && endDate && startTime && endTime) {
      // Validar que endDate + endTime es posterior a startDate + startTime
      const startDateTime = new Date(combineDateAndTime(startDate, startTime));
      const endDateTime = new Date(combineDateAndTime(endDate, endTime));

      if (endDateTime <= startDateTime) {
        setIsAvailable(false);
        setMessage({ text: 'La fecha y hora de fin debe ser posterior a la de inicio', isError: true });
        setPrice(0);
        return;
      }

      setMessage(null);
      checkAvailability(startDateTime, endDateTime);
    }
  }, [spot, startDate, endDate, startTime, endTime]);

  const checkAvailability = async (startDateTime: Date, endDateTime: Date) => {
    if (!spot) return;

    setIsLoading(true);
    try {
      const response = await axios.post('/api/parking-reservations/check-availability', {
        parking_spot_id: spot.id,
        start_date: startDateTime.toISOString(),
        end_date: endDateTime.toISOString(),
      });

      setIsAvailable(response.data.available);
      const priceCalculated = calculatePrice(startDateTime, endDateTime);
      setPrice(priceCalculated);

      if (!response.data.available) {
        setMessage({ text: 'La plaza no está disponible en ese horario', isError: true });
      } else {
        setMessage(null);
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setMessage({ text: 'Error al verificar disponibilidad', isError: true });
      setIsAvailable(false);
      setPrice(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReservation = async () => {
    if (!spot || !startDate || !endDate || !startTime || !endTime || !isAvailable) return;

    const startDateTime = combineDateAndTime(startDate, startTime);
    const endDateTime = combineDateAndTime(endDate, endTime);

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await axios.post('/api/parking-reservations', {
        parking_spot_id: spot.id,
        shopping_center_id: shoppingCenter.id,
        start_date: startDateTime,
        end_date: endDateTime,
      });

      setMessage({
        text: `¡Reserva creada! Por favor, confirma el pago de €${price.toFixed(2)}`,
        isError: false,
      });
    } catch (error: any) {
      console.error(error);
      setMessage({
        text: error.response?.data?.message || 'Error al crear la reserva',
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!spot) {
    return (
      <div className="bg-[#e0f8f3] rounded-lg p-6 text-center">
        <p className="text-gray-500">Selecciona una plaza para reservar</p>
      </div>
    );
  }
  // Generar opciones de hora en intervalos de 15 mins (00, 15, 30, 45)
  const generateTimeOptions = () => {
    const options = [];
    for (let h = 0; h < 24; h++) {
      const hourStr = h.toString().padStart(2, '0');
      ['00', '15', '30', '45'].forEach((m) => {
        options.push(`${hourStr}:${m}`);
      });
    }
    return options;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-h-[80vh] overflow-auto">
      <h3 className="font-semibold text-lg mb-4">Reservar Plaza</h3>

      {message && (
        <div
          className={`mb-4 p-3 rounded-md ${
            message.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {message.text}
        </div>
      )}

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
          <p
            className={`font-medium ${
              !isAvailable || spot.is_occupied ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {!isAvailable || spot.is_occupied ? 'No disponible' : 'Disponible'}
          </p>
        </div>

        {/* Fecha de inicio */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Fecha inicio:</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, 'PPP', { locale: es }) : <span>Elegir fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                locale={es}
                initialFocus
                disabled={(d) => d < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Hora inicio */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Hora inicio:</p>
          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            {generateTimeOptions().map((timeOption) => (
              <option key={timeOption} value={timeOption}>
                {timeOption}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha fin */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Fecha fin:</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, 'PPP', { locale: es }) : <span>Elegir fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                locale={es}
                initialFocus
                disabled={(d) => !startDate || d < startDate}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Hora fin */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Hora fin:</p>
          <select
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            {generateTimeOptions().map((timeOption) => (
              <option key={timeOption} value={timeOption}>
                {timeOption}
              </option>
            ))}
          </select>
        </div>

        {/* Precio */}
        <div className="pt-2 border-t">
          <p className="text-sm text-gray-500">Precio:</p>
          <p className="font-medium">€{price.toFixed(2)}</p>
        </div>

        {/* Botón reservar */}
        <Button
          className="w-full mt-4"
          disabled={!isAvailable || spot.is_occupied || isLoading || price === 0}
          onClick={handleReservation}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Procesando...' : 'Reservar Plaza'}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-2">
          La plaza se reservará por 15 minutos. Si no confirmas el pago, se cancelará automáticamente.
        </p>
      </div>
    </div>
  );
}
