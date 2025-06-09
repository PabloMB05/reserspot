import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Calendar, MapPin, Building2, Layers3 } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

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

interface Props {
  parkingReservations: ParkingReservation[];
}

export function ParkingReservationsHistory({ parkingReservations }: Props) {
  const { t } = useTranslations();

  return (
    <Timeline position="right" className="mt-4">
      {parkingReservations.map((reservation, index) => (
        <TimelineItem key={reservation.id}>
          <TimelineSeparator>
            <TimelineDot color={reservation.canceled_at ? 'error' : 'success'} />
            {index !== parkingReservations.length - 1 && <TimelineConnector />}
          </TimelineSeparator>

          <TimelineContent className="pb-4">
            <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-1">
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

