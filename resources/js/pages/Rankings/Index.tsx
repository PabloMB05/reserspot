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
  isbn: string;
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
  
      return (
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 border border-gray-200 dark:border-gray-700 rounded shadow text-sm">
          <p className="font-semibold">{label}</p>
          <p style={{ color: '#8884d8' }}>{t('ui.ranking.legend.reservation')}: {data.total_reservations}</p>
          <p style={{ color: '#82ca9d' }}>{t('ui.ranking.legend.loan')}: {data.total_loans}</p>
          <p>{t('ui.ranking.zone.floor')}: {data.isbn}</p>
        </div>
      );
    }
    return null;
  };
  const CustomTooltipbook = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
  
      return (
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 border border-gray-200 dark:border-gray-700 rounded shadow text-sm">
          <p className="font-semibold">{label}</p>
          <p style={{ color: '#8884d8' }}>{t('ui.ranking.legend.reservation')}: {data.total_reservations}</p>
          <p style={{ color: '#82ca9d' }}>{t('ui.ranking.legend.loan')}: {data.total_loans}</p>
          <p>ISBN: {data.isbn}</p> 
        </div>
      );
    }
    return null;
  };
  


  return (
    <>
      <RankingLayout title={'Ranking'}>
        <Head title="Ranking de Libros, Usuarios y Zonas" />
        <div className="p-6 text-gray-900 dark:text-white bg-white dark:bg-gray-900 min-h-screen">
          <h1 className="text-2xl font-bold mb-6">{t('ui.ranking.book.title')}</h1>

          <div className="w-full overflow-x-auto bg-gray-100 dark:bg-gray-800 shadow rounded p-4 mb-6">
            <div className="min-w-[700px] h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ranking}>
                  <XAxis dataKey="title" angle={-20} textAnchor="end" height={100} stroke="#ccc" />
                  <YAxis allowDecimals={false} stroke="#ccc" />
                  <Tooltip content={<CustomTooltipbook />} />
                  <Legend />
                  <Bar dataKey="total_reservations" fill="#8884d8" name={t('ui.ranking.legend.reservation')} />
                  <Bar dataKey="total_loans" fill="#82ca9d" name={t('ui.ranking.legend.loan')} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-6">{t('ui.ranking.user.title')}</h1>

          <div className="w-full overflow-x-auto bg-gray-100 dark:bg-gray-800 shadow rounded p-4 mb-6">
            <div className="min-w-[700px] h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userRanking}>
                  <XAxis dataKey="name" angle={-20} textAnchor="end" height={100} stroke="#ccc" />
                  <YAxis allowDecimals={false} stroke="#ccc" />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }} />
                  <Legend />
                  <Bar dataKey="total_reservations" fill="#8884d8" name={t('ui.ranking.legend.reservation')} />
                  <Bar dataKey="total_loans" fill="#82ca9d" name={t('ui.ranking.legend.loan')} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-6">{t('ui.ranking.zone.title')}</h1>

          <div className="w-full overflow-x-auto bg-gray-100 dark:bg-gray-800 shadow rounded p-4">
            <div className="min-w-[700px] h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneRanking}>
                  <XAxis dataKey="name" textAnchor="end" height={100} stroke="#ccc" />
                  <YAxis allowDecimals={false} stroke="#ccc" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="total_reservations" fill="#8884d8" name={t('ui.ranking.legend.reservation')} />
                  <Bar dataKey="total_loans" fill="#82ca9d" name={t('ui.ranking.legend.loan')} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </RankingLayout>
    </>
  );
}
