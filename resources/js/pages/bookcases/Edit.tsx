import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { BookcaseLayout } from '@/layouts/bookcases/BookcaseLayout';
import { BookcaseForm } from '@/pages/bookcases/components/BookcaseForm';
import { ChartColumnStacked } from 'lucide-react';

interface Zone {
  id: string;
  number: number;
  genreName: string;
  capacity: number;
  floor_id: string;
  bookcases_count: number;
}

interface BookcaseFormProps {
  bookcase?: {
    id: string;
    number: number;
    capacity: number;
    zone_id: string;
  };
  floors: {
    id: string;
    floor_number: number;
  }[];
  zones: Zone[];
}

export default function CreateBookcase({ bookcase, floors, zones }: BookcaseFormProps) {
  const { t } = useTranslations();

  // Adaptar los datos a lo que espera BookcaseForm
  const adaptedFloors = floors.map((floor) => ({
    id: floor.id,
    floor_number: floor.floor_number,
  }));

  const adaptedZones = zones.map((zone) => ({
    ...zone,
    genre_name: zone.genreName, // convertir de camelCase a snake_case
  }));

  return (
    <BookcaseLayout title={t('ui.bookcases.edit')}>
      <div className="flex max-w-screen items-center self-center">
        <Card className="w-full m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-1">
                <ChartColumnStacked color="#2762c2" />
                {t('ui.bookcases.cards.edit.title')}
              </div>
            </CardTitle>
            <CardDescription>{t('ui.bookcases.cards.edit.description')}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <BookcaseForm
              initialData={bookcase}
              floors={adaptedFloors}
              zones={adaptedZones}
            />
          </CardContent>
        </Card>
      </div>
    </BookcaseLayout>
  );
}
