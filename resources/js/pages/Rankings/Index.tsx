import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from 'recharts';
import { RankingLayout } from '@/layouts/ranking/RankingLayout';
import { useTranslations } from "@/hooks/use-translations";

interface RankingItem {
  title: string;
  total_reservations: number;
  total_loans: number;
}

interface UserActivityItem {
  name: string;
  total_actions: number;
}

interface ZoneActivityItem {
  name: string;
  total_actions: number;
}

interface PageProps {
  lang: string;
  ranking: RankingItem[];
  userRanking: UserActivityItem[];
  zoneRanking: ZoneActivityItem[];
}

export default function Index() {
  const { t } = useTranslations(); 
  const { props } = usePage<PageProps>();
  const { ranking, userRanking, zoneRanking } = props;

  return (
    <>
      <RankingLayout title={'Ranking'}>
        <Head title="Ranking de Libros, Usuarios y Zonas" />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">{t('ui.ranking.book.title')}</h1>

          <div className="w-full h-[400px] bg-white shadow rounded p-4 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ranking}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" angle={-20} textAnchor="end" height={100} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_reservations" fill="#8884d8" name={t('ui.ranking.legend.reservation')}>
                </Bar>
                <Bar dataKey="total_loans" fill="#82ca9d" name={t('ui.ranking.legend.loan')}>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <h1 className="text-2xl font-bold mb-6">{t('ui.ranking.user.title')}</h1>

          <div className="w-full h-[400px] bg-white shadow rounded p-4 mb-6">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userRanking}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-20} textAnchor="end" height={100} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_reservations" fill="#8884d8" name={t('ui.ranking.legend.reservation')} />
                <Bar dataKey="total_loans" fill="#82ca9d" name={t('ui.ranking.legend.loan')} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <h1 className="text-2xl font-bold mb-6">{t('ui.ranking.zone.title')}</h1>

          <div className="w-full h-[400px] bg-white shadow rounded p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneRanking}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"  textAnchor="end" height={100} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_reservations" fill="#8884d8" name={t('ui.ranking.legend.reservation')} />
                <Bar dataKey="total_loans" fill="#82ca9d" name={t('ui.ranking.legend.loan')} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </RankingLayout>
    </>
  );
}
