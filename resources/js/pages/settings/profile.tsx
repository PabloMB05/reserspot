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

export default function Profile() {
  const { t } = useTranslations();
  const page = usePage<{ props: SharedData & ProfileProps }>();
  const { auth, loans, reservations } = page.props;

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
            description={t('ui.rec  ords.description')}
          />

          <Tabs defaultValue="loans" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="loans">{t('ui.loans.title')}</TabsTrigger>
              <TabsTrigger value="reservations">{t('ui.reservations.title')}</TabsTrigger>
            </TabsList>

            {/* Contenido de Préstamos */}
            <TabsContent value="loans" className="space-y-4">
              {loans.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Book className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">{t('ui.records.loan.none')}</h3>
                  <p className="mt-1 text-sm text-gray-500">{t('ui.records.loan.info')}</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                  <Timeline position="alternate" className="p-4 sm:p-6">
                    {loans.map((loan, index) => (
                      <TimelineItem key={loan.id} className="relative">
                        <TimelineSeparator>
                          <TimelineDot
                            color={
                              loan.deleted_at ? 'grey' : 
                              loan.return ? 'primary' : 
                              loan.is_overdue ? 'error' : 'success'
                            }
                            variant={loan.deleted_at ? 'outlined' : 'filled'}
                            className="!shadow-sm"
                          />
                          {index !== loans.length - 1 && (
                            <TimelineConnector className="bg-gray-200" />
                          )}
                        </TimelineSeparator>
                        <TimelineContent className="py-4 pl-2 pr-0 sm:pl-4">
                          <div className={cn(
                            "rounded-lg border p-4 transition-all hover:shadow-sm",
                            loan.deleted_at ? "border-gray-200 bg-gray-50" : 
                            loan.is_overdue ? "border-red-100 bg-red-50" : 
                            "border-blue-100 bg-blue-50"
                          )}>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <Book className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                                <div>
                                  <h3 className="text-sm font-medium leading-tight text-gray-900 sm:text-base">
                                    {loan.book.title}
                                  </h3>
                                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 sm:text-sm">
                                    <div className="flex items-center">
                                      <Calendar className="mr-1 h-3 w-3" />
                                      <span>Exp: {loan.expedit ?? 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="mr-1 h-3 w-3" />
                                      <span>Dev: {loan.return ?? 'Pendiente'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {loan.deleted_at && (
                                <Trash2 className="h-4 w-4 text-gray-400" />
                              )}
                            </div>

                            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                              <div className="text-xs text-gray-600 sm:text-sm">
                                <span className="font-medium">Duración:</span> {loan.end_due ?? '—'}
                              </div>

                              {loan.remaining_days !== undefined && (
                                <div className={cn(
                                  "flex items-center text-xs sm:text-sm",
                                  loan.is_overdue ? "text-red-600" : "text-green-600"
                                )}>
                                  {loan.is_overdue ? (
                                    <>
                                      <AlertTriangle className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                                      <span>
                                        Vencido hace {Math.abs(loan.remaining_days)} días
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                                      <span>
                                        Faltan {Math.abs(loan.remaining_days)} días
                                      </span>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>

                            {loan.deleted_at && (
                              <div className="mt-2 flex items-center text-xs text-red-500 sm:text-sm">
                                <Trash2 className="mr-1 h-3 w-3" />
                                Préstamo eliminado
                              </div>
                            )}
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </div>
              )}
            </TabsContent>

            {/* Contenido de Reservas */}
            <TabsContent value="reservations" className="space-y-4">
              {reservations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Book className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay reservas registradas</h3>
                  <p className="mt-1 text-sm text-gray-500">Cuando hagas una reserva, aparecerá aquí.</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                  <Timeline position="alternate" className="p-4 sm:p-6">
                    {reservations.map((reservation, index) => (
                      <TimelineItem key={reservation.id} className="relative">
                        <TimelineSeparator>
                          <TimelineDot
                            color={reservation.deleted_at ? 'grey' : 'primary'}
                            variant={reservation.deleted_at ? 'outlined' : 'filled'}
                            className="!shadow-sm"
                          />
                          {index !== reservations.length - 1 && (
                            <TimelineConnector className="bg-gray-200" />
                          )}
                        </TimelineSeparator>
                        <TimelineContent className="py-4 pl-2 pr-0 sm:pl-4">
                          <div className={cn(
                            "rounded-lg border p-4 transition-all hover:shadow-sm",
                            reservation.deleted_at ? "border-gray-200 bg-gray-50" : "border-purple-100 bg-purple-50"
                          )}>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <Book className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                                <div>
                                  <h3 className="text-sm font-medium leading-tight text-gray-900 sm:text-base">
                                    {reservation.book.title}
                                  </h3>
                                  <div className="mt-1 flex items-center text-xs text-gray-600 sm:text-sm">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    <span>Reservado el: {reservation.expedit ?? 'N/A'}</span>
                                  </div>
                                </div>
                              </div>
                              {reservation.deleted_at && (
                                <Trash2 className="h-4 w-4 text-gray-400" />
                              )}
                            </div>

                            {reservation.deleted_at && (
                              <div className="mt-2 flex items-center text-xs text-red-500 sm:text-sm">
                                <Trash2 className="mr-1 h-3 w-3" />
                                Reserva cancelada
                              </div>
                            )}
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}