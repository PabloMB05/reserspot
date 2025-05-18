import { useState, useEffect } from 'react';
import { useShoppingCenters } from '@/hooks/shoppingcenter/useshoppingcenter';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { MapPinned, ParkingCircle, CalendarCheck2, Store } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Centro Comercial', href: '/shopping-center' },
];

const DAYS = [
  { value: 'monday', label: 'Lunes' },
  { value: 'tuesday', label: 'Martes' },
  { value: 'wednesday', label: 'Miércoles' },
  { value: 'thursday', label: 'Jueves' },
  { value: 'friday', label: 'Viernes' },
  { value: 'saturday', label: 'Sábado' },
  { value: 'sunday', label: 'Domingo' },
];

export default function ShoppingCenterDashboard() {
  const { data: centersData, loading, error } = useShoppingCenters();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('monday');
  
  const selected = centersData?.data.find((c) => c.id === selectedId) || null;

  // Obtener el horario de apertura según el día seleccionado
  const getOpeningHourByDay = (openingHours, dayKey: string) => {
    if (!Array.isArray(openingHours)) return null;
    return openingHours.find((h) => h.day_of_week === dayKey) || null;
  };

  // Verificar si el centro está abierto en el horario seleccionado
  const isCenterOpen = (hours) => {
    if (!hours) return false;
    if (hours.is_closed) return false;

    // Obtener la hora actual
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // Convertir las horas de apertura y cierre a formato de 24 horas
    const [openHour, openMinute] = hours.open_time.split(':').map(Number);
    const [closeHour, closeMinute] = hours.close_time.split(':').map(Number);

    // Comprobar si la hora actual está dentro del rango de apertura
    const isOpen =
      (currentHour > openHour || (currentHour === openHour && currentMinute >= openMinute)) &&
      (currentHour < closeHour || (currentHour === closeHour && currentMinute <= closeMinute));

    return isOpen;
  };

  // Renderizar los horarios para el día seleccionado
  const renderSelectedDayHours = (hours) => {
    if (!hours) return 'Horario no disponible';
    if (hours.is_closed) return 'Cerrado';
    return `${hours.open_time} - ${hours.close_time}`;
  };

  // Verificar si el centro está abierto para el día seleccionado
  const selectedDayHours = getOpeningHourByDay(selected?.opening_hours, selectedDay);
  const isOpenNow = isCenterOpen(selectedDayHours);

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Centro Comercial" />

      <div className="p-4 space-y-6">
        {/* Selector de centros comerciales */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Selecciona un centro comercial
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedId || ''}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {centersData?.data.map((center) => (
              <option key={center.id} value={center.id}>
                {center.name}
              </option>
            ))}
          </select>
        </div>

        {selected && (
          <div className="bg-white shadow p-4 rounded space-y-2">
            <h2 className="text-xl font-semibold">{selected.name}</h2>
            <p className="text-sm text-gray-600">{selected.location}</p>
            <p className="text-gray-800">{selected.description}</p>

            <div className="text-sm text-green-600 font-medium">
              {isOpenNow ? 'Abierto ahora' : 'Cerrado temporalmente'}
            </div>

            {selected.opening_hours && (
              <div className="text-sm text-gray-700 space-y-2">
                {/* Selector de día */}
                <div>
                  <label className="block text-sm font-medium mb-1">Selecciona un día</label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                  >
                    {DAYS.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mostrar los horarios para el día seleccionado */}
                <div>
                  <span className="font-medium">Horario:</span>{' '}
                  {renderSelectedDayHours(selectedDayHours)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Accesos rápidos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Tiendas"
            description="Listado de comercios"
            href={`/shopping-center/${selected?.id}/stores`}
            icon={Store}
          />
          <DashboardCard
            title="Parking"
            description="Consulta y reserva plazas"
            href={`/shopping-center/${selected?.id}/parking`}
            icon={ParkingCircle}
          />
          <DashboardCard
            title="Eventos"
            description="Ver actividades y promociones"
            href={`/shopping-center/${selected?.id}/events`}
            icon={CalendarCheck2}
          />
          <DashboardCard
            title="Mapa interior"
            description="Visualiza la distribución del centro"
            href={`/shopping-center/${selected?.id}/map`}
            icon={MapPinned}
          />
        </div>
      </div>
    </AppLayout>
  );
}
