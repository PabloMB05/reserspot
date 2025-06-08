import {
  Book,
  Trash2,
  Calendar,
} from 'lucide-react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/use-translations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ParkingReservation {
  id: number;
  parkingSpot: string; // número o nombre de plaza
  reservationDate: string; // fecha en ISO o string legible
  expiredAt?: string | null; // opcional, fecha de finalización
  canceledAt?: string | null; // fecha de cancelación si aplica
}

interface ProfileProps {
  parkingReservations: ParkingReservation[];
}

export function ParkingReservationsHistory({ parkingReservations }: ProfileProps) {
  const { t } = useTranslations();

  return (
    <Tabs defaultValue="parkingReservations" className="w-full">
      <TabsList className="grid w-full grid-cols-1">
        <TabsTrigger value="parkingReservations">{t('ui.records.parkingReservations.title')}</TabsTrigger>
      </TabsList>

      <TabsContent value="parkingReservations" className="space-y-4">
        {parkingReservations.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Book className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">{t('ui.records.parkingReservations.none')}</h3>
            <p className="mt-1 text-sm text-gray-500">{t('ui.records.parkingReservations.info')}</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <Timeline position="alternate" className="p-4 sm:p-6">
              {parkingReservations.map((reservation, index) => (
                <TimelineItem key={reservation.id} className="relative">
                  <TimelineSeparator>
                    <TimelineDot
                      color={reservation.canceledAt ? 'grey' : 'primary'}
                      variant={reservation.canceledAt ? 'outlined' : 'filled'}
                      className="!shadow-sm"
                    />
                    {index !== parkingReservations.length - 1 && <TimelineConnector className="bg-gray-200" />}
                  </TimelineSeparator>
                  <TimelineContent className="py-4 pl-2 pr-0 sm:pl-4">
                    <div
                      className={cn(
                        'rounded-lg border p-4 transition-all hover:shadow-sm',
                        reservation.canceledAt ? 'border-gray-200 bg-gray-50' : 'border-green-100 bg-green-50'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Book className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                          <div>
                            <h3 className="text-sm font-medium leading-tight text-gray-900 sm:text-base">
                              {t('ui.records.parkingReservations.spot')}: {reservation.parkingSpot}
                            </h3>
                            <div className="mt-1 flex items-center text-xs text-gray-600 sm:text-sm">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>
                                {t('ui.records.parkingReservations.date')}: {reservation.reservationDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        {reservation.canceledAt && (
                          <Trash2 className="h-4 w-4 text-gray-400" />
                        )}
                      </div>

                      {reservation.canceledAt && (
                        <div className="mt-2 flex items-center text-xs text-red-500 sm:text-sm">
                          <Trash2 className="mr-1 h-3 w-3" />
                          {t('ui.records.parkingReservations.canceled')}
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
  );
}
