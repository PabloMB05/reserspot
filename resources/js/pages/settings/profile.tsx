import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { cn } from '@/lib/utils';
import { ParkingReservationsHistory } from '../users/components/TimeLine';
import { useState } from 'react';
import { TimeLineLayout } from '@/layouts/timeline/timelinelayout';

interface ParkingReservation {
  id: number;
  parkingSpot: string;
  expedit: string | null;
  canceled_at?: string | null;
  reservationDate: string;
}

interface ProfileProps {
  user: {
    name: string;
    email: string;
  };
  parkingReservations: {
    id: number;
    parkingSpot: string;
    expedit: string | null;
    canceled_at?: string | null;
  }[];
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

  // Convertimos las reservas para incluir reservationDate (usando expedit)
  const mappedParkingReservations: ParkingReservation[] = (page.props.parkingReservations || []).map((res) => ({
    ...res,
    reservationDate: res.expedit ?? '',
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
                <label className="block text-sm font-medium mb-1">Desde:</label>
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
                <label className="block text-sm font-medium mb-1">Hasta:</label>
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

          <TimeLineLayout title={user.name}>
            <ParkingReservationsHistory parkingReservations={filteredParkingReservations} />
          </TimeLineLayout>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
