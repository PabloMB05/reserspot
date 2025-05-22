import { useState } from 'react';
import { useShoppingCenters } from '@/hooks/shoppingcenter/useshoppingcenter';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { MapPinned, ParkingCircle, CalendarCheck2, Store } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useTranslations } from '@/hooks/use-translations';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Menu', href: '/shopping-center' },
];

export default function ShoppingCenterDashboard() {
  const { t } = useTranslations();
  const { data: centersData, loading, error } = useShoppingCenters();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('monday');

  const DAYS = [
    { value: 'monday', label: t('ui.days.monday') },
    { value: 'tuesday', label: t('ui.days.tuesday') },
    { value: 'wednesday', label: t('ui.days.wednesday') },
    { value: 'thursday', label: t('ui.days.thursday') },
    { value: 'friday', label: t('ui.days.friday') },
    { value: 'saturday', label: t('ui.days.saturday') },
    { value: 'sunday', label: t('ui.days.sunday') },
  ];

  const selected = centersData?.data.find((c) => c.id === selectedId) || null;

  const getOpeningHourByDay = (openingHours, dayKey: string) => {
    if (!Array.isArray(openingHours)) return null;
    return openingHours.find((h) => h.day_of_week === dayKey) || null;
  };

  const isCenterOpen = (hours) => {
    if (!hours || hours.is_closed) return false;
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    const [openHour, openMinute] = hours.open_time.split(':').map(Number);
    const [closeHour, closeMinute] = hours.close_time.split(':').map(Number);

    return (
      (currentHour > openHour || (currentHour === openHour && currentMinute >= openMinute)) &&
      (currentHour < closeHour || (currentHour === closeHour && currentMinute <= closeMinute))
    );
  };

  const renderSelectedDayHours = (hours) => {
    if (!hours) return t('ui.shoppingcenter.hours.close');
    if (hours.is_closed) return t('ui.shoppingcenter.hours.is_closed');
    return `${hours.open_time} - ${hours.close_time}`;
  };

  const selectedDayHours = getOpeningHourByDay(selected?.opening_hours, selectedDay);
  const isOpenNow = isCenterOpen(selectedDayHours);

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={t('ui.shoppingcenter.title')} />

      <div className="p-4 space-y-6">
        {/* Selector de centros comerciales */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('ui.shoppingcenter.selectcenter')}
          </label>
          <Select value={selectedId || ''} onValueChange={setSelectedId}>
            <SelectTrigger>
              <SelectValue placeholder={t('ui.shoppingcenter.selectcenter')} />
            </SelectTrigger>
            <SelectContent>
              {centersData?.data.map((center) => (
                <SelectItem key={center.id} value={center.id}>
                  {center.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selected && (
          <div className="bg-white shadow p-4 rounded space-y-2">
            <h2 className="text-xl font-semibold">{selected.name}</h2>
            <p className="text-sm text-gray-600">{selected.location}</p>
            <p className="text-gray-800">{selected.description}</p>

            <div className="text-sm text-green-600 font-medium">
              {isOpenNow ? t('ui.shoppingcenter.open') : t('ui.shoppingcenter.close')}
            </div>

            {selected.opening_hours && (
              <div className="text-sm text-gray-700 space-y-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('ui.shoppingcenter.selectday')}
                  </label>
                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('ui.shoppingcenter.selectday')} />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <span className="font-medium">{t('ui.shoppingcenter.schedule')}:</span>{' '}
                  {renderSelectedDayHours(selectedDayHours)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Accesos rápidos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            className="bg-[#dcedd8] hover:bg-[#c1e1d1]"
            title={t('ui.stores')}
            description={t('ui.storesDescription')}
            href={selected ? route('shopping-centers.stores.index', selected.id) : '#'}
            icon={Store}
            disabled={!selected}
          />
          <DashboardCard
            className="bg-[#dcedd8] hover:bg-[#c1e1d1]"
            title={t('ui.parking')}
            description={t('ui.parkingDescription')}
            href={selected ? `/shopping-center/${selected.id}/parking` : '#'}
            icon={ParkingCircle}
            disabled={!selected}
          />
          <DashboardCard
            className="bg-[#dcedd8] hover:bg-[#c1e1d1]"
            title={t('ui.events')}
            description={t('ui.eventsDescription')}
            href={selected ? `/shopping-center/${selected.id}/events` : '#'}
            icon={CalendarCheck2}
            disabled={!selected}
          />
          <DashboardCard
            className="bg-[#dcedd8] hover:bg-[#c1e1d1]"
            title={t('ui.map')}
            description={t('ui.mapDescription')}
            href={selected ? `/shopping-center/${selected.id}/map` : '#'}
            icon={MapPinned}
            disabled={!selected}
          />
        </div>
      </div>
    </AppLayout>
  );
}
 