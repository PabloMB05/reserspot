import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale';
import { formatISO } from 'date-fns';
import { format, differenceInHours } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import axios from 'axios';
import { AlertModal } from "@/components/ui/AlertModal";

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

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);



const combineDateAndTime = (date: Date, time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const combined = new Date(date);
  
  // Asegurar que usamos la hora local
  return new Date(
    combined.getFullYear(),
    combined.getMonth(),
    combined.getDate(),
    hours,
    minutes,
    0
  );
};

  const calculatePrice = (start: Date, end: Date) => {
    const hours = differenceInHours(end, start);
    return hours > 0 ? hours * 2 : 0;
  };

  useEffect(() => {
    if (spot && startDate && endDate && startTime && endTime) {
      const startDateTime = combineDateAndTime(startDate, startTime);
      const endDateTime = combineDateAndTime(endDate, endTime);

      if (endDateTime <= startDateTime) {
        setIsAvailable(false);
        setMessage({ text: 'La fecha y hora de fin debe ser posterior a la de inicio', isError: true });
        setPrice(0);
        return;
      }

      if (spot.is_occupied) {
        setIsAvailable(false);
        setMessage({ text: 'La plaza ya está ocupada', isError: true });
        setPrice(0);
        return;
      }

      // Si pasa todas las validaciones
      setIsAvailable(true);
      setMessage(null);
      setPrice(calculatePrice(startDateTime, endDateTime));
    }
  }, [spot, startDate, endDate, startTime, endTime]);

  const handleReservation = async () => {
  if (!spot || !startDate || !endDate || !startTime || !endTime || !isAvailable) return;

  const startDateTime = combineDateAndTime(startDate, startTime);
  const endDateTime = combineDateAndTime(endDate, endTime);

  // Convertir a formato ISO sin ajuste de zona horaria
  const startDateTimeISO = formatISO(startDateTime, { representation: 'complete' });
  const endDateTimeISO = formatISO(endDateTime, { representation: 'complete' });

  setIsLoading(true);
  setMessage(null);

  try {
    await axios.post('/api/parking-reservations', {
      parking_spot_id: spot.id,
      shopping_center_id: shoppingCenter.id,
      start_date: startDateTimeISO,
      end_date: endDateTimeISO,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone // Envía la zona horaria del cliente
    });

    setModalMessage('¡Reserva realizada con éxito! Te hemos enviado un correo con los detalles.');
    setIsSuccessModal(true);
    setShowModal(true);
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Error al crear la reserva';
    setModalMessage(msg);
    setShowModal(true);
  } finally {
    setIsLoading(false);
  }
};

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

  if (!spot) {
    return (
      <div className="bg-[#e0f8f3] rounded-lg p-6 text-center">
        <p className="text-gray-500">Selecciona una plaza para reservar</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-h-[80vh] overflow-auto">
      <h3 className="font-semibold text-lg mb-4">Reservar Plaza</h3>

      {message && (
        <div className={`mb-4 p-3 rounded-md ${message.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
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
          <p className={`font-medium ${!isAvailable || spot.is_occupied ? 'text-red-600' : 'text-green-600'}`}>
            {!isAvailable || spot.is_occupied ? 'No disponible' : 'Disponible'}
          </p>
        </div>

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

        <div>
          <p className="text-sm text-gray-500 mb-2">Hora inicio:</p>
          <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full border rounded-md px-3 py-2">
            {generateTimeOptions().map((time) => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </div>

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

        <div>
          <p className="text-sm text-gray-500 mb-2">Hora fin:</p>
          <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full border rounded-md px-3 py-2">
            {generateTimeOptions().map((time) => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-gray-500">Precio:</p>
          <p className="font-medium">€{price.toFixed(2)}</p>
        </div>

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
      <AlertModal 
      open={showModal} 
      onClose={() => setShowModal(false)} 
      message={modalMessage}/>
    </div>
    
  );
  
}
