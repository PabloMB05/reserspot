import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { ZoneLayout } from '@/layouts/zones/ZoneLayout';
import { ZoneForm } from '@/pages/zones/components/ZoneForm';
import { MapPin } from 'lucide-react';
import { BookcaseForm } from './components/BookcaseForm';

interface BookcaseFormProps {
    initialData?: {
        id: string;
        number: string;
        capacity: string;
        zone_id: string;
        floor_id:string; 
    };
    zones: any[];
    floors:any[];
    page?: string;
    perPage?: string;
    isLoadingZones?: boolean;
    zonesError?: Error | null;
}

export default function CreateBookcase({ zones, floors }: BookcaseFormProps) {
    const { t } = useTranslations();

    return (
        <ZoneLayout title={t('ui.bookcases.cards.create.title')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-full m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <MapPin color="#2762c2" />
                                {t('ui.bookcases.cards.create.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>
                            {t('ui.bookcases.cards.create.description')}
                        </CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4">
                        <BookcaseForm zones={zones} floors={floors}></BookcaseForm>
                    </CardContent>
                </Card>
            </div>
        </ZoneLayout>
    );
}