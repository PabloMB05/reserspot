import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Users, User, Building2, Layers, Library, Book, HandHelping, Import, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CardFlip from "@/components/ui/card-flip";
import { Icon } from '@/components/icon';
import { useTranslations } from '@/hooks/use-translations';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { t } = useTranslations();
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
  
        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title={t('ui.dashboard.users')}
            description={t('ui.dashboard.description.users')}
            href="/users"
            icon={Users}
          />
  
          <DashboardCard
            title={t('ui.dashboard.floor')}
            description={t('ui.dashboard.description.floors')}
            href="/floors"
            icon={Building2}
          />
  
          <DashboardCard
            title={t('ui.dashboard.zones')}
            description={t('ui.dashboard.description.zones')}
            href="/zones"
            icon={Layers}
          />
  
          <DashboardCard
            title={t('ui.dashboard.bookcases')}
            description={t('ui.dashboard.description.bookcases')}
            href="/bookcases"
            icon={Library}
          />
  
          <DashboardCard
            title={t('ui.dashboard.books')}
            description={t('ui.dashboard.description.books')}
            href="/books"
            icon={Book}
          />
  
          <DashboardCard
            title={t('ui.dashboard.loans')}
            description={t('ui.dashboard.description.loans') || 'Gestionar todos los préstamos del sistema'}
            href="/loans"
            icon={HandHelping}
          />
  
          <DashboardCard
            title={t('ui.dashboard.reservations')}
            description={t('ui.dashboard.description.reservations') || 'Gestionar todas las reservas del sistema'}
            href="/reservations"
            icon={Import}
          />
          <DashboardCard
            title={t('ui.dashboard.ranking')}
            description={t('ui.dashboard.description.ranking') || 'Ver los ranking de la biblioteca'}
            href="/ranking"
            icon={TrendingUp}
          />

        </div>
      </AppLayout>
    );
}
