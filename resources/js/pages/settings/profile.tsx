import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Book, CheckCircle, AlertTriangle, Calendar, Clock, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimeLineSection } from '../users/components/TimeLine';
import { useEffect, useState } from 'react';
import { TimeLineLayout } from '@/layouts/timeline/timelinelayout';
interface ProfileProps {
  user: {
    name:string;
    email: string;
  };
  loans: {
    id: number;
    book: {
      title: string;
    };
    expedit: string | null;
    return: string | null;
    due_date: Date;
    end_due: string | null;
    deleted_at?: string | null;
    remaining_days?: number;
    remaining_hours?: number;
    is_overdue?: boolean;
  }[];
  reservations: {
    id: number;
    book: {
      title: string;
    };
    expedit: string | null;
    deleted_at?: string | null;
  }[];
}

export default function Profile({user, loans, reservations}:ProfileProps) {
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

  const filterByDateRange = <T extends { expedit: string | null }>(items: T[]) => {
    if (!startDate && !endDate) return items;

    return items.filter((item) => {
      if (!item.expedit) return false;
      const expDate = new Date(item.expedit);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (
        (!start || expDate >= start) &&
        (!end || expDate <= end)
      );
    });
  };

  const filteredLoans = filterByDateRange(loans);
  const filteredReservations = filterByDateRange(reservations);
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
                          className="border rounded px-2 py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Hasta:</label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="border rounded px-2 py-1"
                        />
                      </div>
                    </div>
                  </div>
                  <TimeLineSection loans={filteredLoans} reservations={filteredReservations} />
              </div>
      </SettingsLayout>
    </AppLayout>
  );
}