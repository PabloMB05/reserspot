import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { RankingLayout } from '@/layouts/ranking/RankingLayout';
import { useTranslations } from "@/hooks/use-translations";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface RankingItem {
  title: string;
  isbn: string;
  total_reservations: number;
  total_loans: number;
}

interface UserActivityItem {
  name: string;
  total_reservations: number;
  total_loans: number;
}

interface ZoneActivityItem {
  name: string;
  total_reservations: number;
  total_loans: number;
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

  const [activeTooltipData, setActiveTooltipData] = useState<RankingItem | null>(null);

  const BookTooltip = ({ data }: { data: RankingItem }) => {
    if (!data) return null;
    return (
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 border border-gray-200 dark:border-gray-700 rounded shadow text-sm max-w-[300px]">
        <p className="font-semibold">{data.title}</p>
        <p style={{ color: '#8884d8' }}>{t('ui.ranking.legend.reservation')}: {data.total_reservations}</p>
        <p style={{ color: '#82ca9d' }}>{t('ui.ranking.legend.loan')}: {data.total_loans}</p>
        <p>ISBN: {data.isbn}</p>
      </div>
    );
  };

  const GenericTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 border border-gray-200 dark:border-gray-700 rounded shadow text-sm max-w-[300px]">
          <p className="font-semibold">{label}</p>
          <p style={{ color: '#8884d8' }}>{t('ui.ranking.legend.reservation')}: {data.total_reservations}</p>
          <p style={{ color: '#82ca9d' }}>{t('ui.ranking.legend.loan')}: {data.total_loans}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <RankingLayout title="Ranking">
      <Head title="Ranking de Libros, Usuarios y Zonas" />
      <div className="px-2 md:px-4 lg:px-8 py-4 space-y-10 text-gray-900 dark:text-white bg-white dark:bg-gray-900 min-h-screen">

        {/* Ranking de libros */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4">{t('ui.ranking.book.title')}</h2>
          <ScrollArea className="w-full">
            <div className="relative min-w-[700px] bg-gray-100 dark:bg-white shadow rounded p-4">
              <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ranking}
                    onClick={(e) => {
                      if (e?.activePayload?.[0]) {
                        setActiveTooltipData(e.activePayload[0].payload);
                      } else {
                        setActiveTooltipData(null);
                      }
                    }}
                  >
                    <XAxis dataKey="title" angle={-20} textAnchor="end" height={100} />
                    <YAxis allowDecimals={false} />
                    <Tooltip content={<></>} />
                    <Legend />
                    <Bar dataKey="total_loans" fill="#82ca9d" name={t('ui.ranking.legend.loan')} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {activeTooltipData && (
                <div className="absolute top-4 right-4 z-50">
                  <BookTooltip data={activeTooltipData} />
                </div>
              )}
            </div>
          </ScrollArea>
        </section>

        {/* Ranking de usuarios */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4">{t('ui.ranking.user.title')}</h2>
          <ScrollArea className="w-full">
            <div className="min-w-[700px] bg-gray-100 dark:bg-white shadow rounded p-4">
              <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userRanking}>
                    <XAxis dataKey="name" angle={-20} textAnchor="end" height={100} />
                    <YAxis allowDecimals={false} />
                    <Tooltip content={<GenericTooltip />} />
                    <Legend />
                    <Bar dataKey="total_reservations" fill="#8884d8" name={t('ui.ranking.legend.reservation')} />
                    <Bar dataKey="total_loans" fill="#82ca9d" name={t('ui.ranking.legend.loan')} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ScrollArea>
        </section>

        {/* Ranking de zonas */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4">{t('ui.ranking.zone.title')}</h2>
          <ScrollArea className="w-full">
            <div className="min-w-[700px] bg-gray-100 dark:bg-white shadow rounded p-4">
              <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={zoneRanking}>
                    <XAxis dataKey="name" angle={-20} textAnchor="end" height={100} />
                    <YAxis allowDecimals={false} />
                    <Tooltip content={<GenericTooltip />} />
                    <Legend />
                    <Bar dataKey="total_reservations" fill="#8884d8" name={t('ui.ranking.legend.reservation')} />
                    <Bar dataKey="total_loans" fill="#82ca9d" name={t('ui.ranking.legend.loan')} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ScrollArea>
        </section>

      </div>
    </RankingLayout>
  );
}
