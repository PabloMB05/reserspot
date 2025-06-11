import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Calendar, MapPin, Building2, Layers3, Trash2 } from 'lucide-react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface ParkingReservation {
  id: number;
  parkingSpot: string;
  zone: string;
  floor: string;
  shoppingCenter: string;
  expedit: string | null;
  reservationDate: string;
  canceled_at?: string | null;
}

interface ProfileProps {
  user: {
    name: string;
    email: string;
  };
  parkingReservations: ParkingReservation[];
}

function ParkingReservationsHistory({ 
  parkingReservations,
  onDeleteReservation 
}: {
  parkingReservations: ParkingReservation[];
  onDeleteReservation?: (id: number) => Promise<void>;
}) {
  const { t } = useTranslations();

  const handleDelete = async (id: number) => {
    if (onDeleteReservation && window.confirm(t('ui.history.parking.confirm_delete'))) {
      await onDeleteReservation(id);
    }
  };

  return (
    <Timeline position="right" className="mt-4">
      {parkingReservations.map((reservation, index) => (
        <TimelineItem key={reservation.id}>
          <TimelineSeparator>
            <TimelineDot color={reservation.canceled_at ? 'error' : 'success'} />
            {index !== parkingReservations.length - 1 && <TimelineConnector />}
          </TimelineSeparator>

          <TimelineContent className="pb-4">
            <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 relative">
              {!reservation.canceled_at && onDeleteReservation && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 p-2"
                  onClick={() => handleDelete(reservation.id)}
                  aria-label={t('ui.history.parking.delete')}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}

              <p className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-1 pr-6">
                <Calendar className="w-4 h-4" />
                {reservation.reservationDate}
              </p>

              <p className="text-sm text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{t('ui.history.parking.spot')}: {reservation.parkingSpot}</span>
              </p>

              <p className="text-sm text-gray-700 flex items-center gap-2">
                <Layers3 className="w-4 h-4" />
                <span>{t('ui.history.parking.zone')}: {reservation.zone}</span>
              </p>

              <p className="text-sm text-gray-700 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>{t('ui.history.parking.floor')}: {reservation.floor}</span>
              </p>

              <p className="text-sm text-gray-700 flex items-center gap-2">
                🛒 {t('ui.history.parking.center')}: {reservation.shoppingCenter}
              </p>

              {reservation.canceled_at && (
                <p className="text-xs text-red-600 mt-2 font-medium">
                  {t('ui.history.parking.canceled_at')}: {reservation.canceled_at}
                </p>
              )}
            </div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default function Profile({ user }: ProfileProps) {
  const { t } = useTranslations();
  const page = usePage<{ props: SharedData & ProfileProps }>();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('ui.settings.profile.title'),
      href: '/settings/profile',
    },
  ];

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reservations, setReservations] = useState(page.props.parkingReservations || []);

const handleDeleteReservation = async (id: string) => {
  try {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    const response = await axios.delete(`/api/parking-reservations/${id}/destroy`, {
      headers: {
        'X-CSRF-TOKEN': csrfToken || '',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Si usas Sanctum
      }
    });

    if (response.status === 204) {
      setReservations(reservations.filter(res => res.id !== id));
    } else {
      console.error('Unexpected response:', response);
      alert(t('ui.errors.delete_failed'));
    }
  } catch (error) {
    console.error('Full error deleting reservation:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      alert(error.response?.data?.message || t('ui.errors.delete_failed'));
    } else {
      alert(t('ui.errors.delete_failed'));
    }
  }
};

  const mappedParkingReservations: ParkingReservation[] = reservations.map((res) => ({
    ...res,
    reservationDate: res.expedit ?? '',
    zone: res.zone ?? 'N/A',
    floor: res.floor ?? 'N/A',
    shoppingCenter: res.shoppingCenter ?? 'N/A'
  }));

  const filterByDateRange = <T extends { reservationDate: string }>(items: T[]) => {
    if (!startDate && !endDate) return items;

    return items.filter((item) => {
      if (!item.reservationDate) return false;
      const resDate = new Date(item.reservationDate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (!start || resDate >= start) && (!end || resDate <= end);
    });
  };

  const filteredParkingReservations = filterByDateRange(mappedParkingReservations);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={t('ui.settings.profile.title')} />
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title={t('ui.records.title')}
            description={t('ui.records.description')}
          />

          <div className="ml-3">
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">{t('ui.common.from')}:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={cn(
                    "border rounded px-2 py-1 outline-none transition-all",
                    startDate && "border-[#20c997] ring-1 ring-[#20c997]/50"
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('ui.common.to')}:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={cn(
                    "border rounded px-2 py-1 outline-none transition-all",
                    endDate && "border-[#20c997] ring-1 ring-[#20c997]/50"
                  )}
                />
              </div>
            </div>
          </div>

          <ParkingReservationsHistory 
            parkingReservations={filteredParkingReservations} 
            onDeleteReservation={handleDeleteReservation}
          />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}