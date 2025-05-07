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

interface ProfileProps {
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

export default function Profile({loans, reservations}:ProfileProps) {
  const { t } = useTranslations();
  const page = usePage<{ props: SharedData & ProfileProps }>();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('ui.settings.profile.title'),
      href: '/settings/profile',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={t('ui.settings.profile.title')} />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title={t('ui.records.title')}
            description={t('ui.records.description')}
          />

          <TimeLineSection loans={loans} reservations={reservations}></TimeLineSection>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}