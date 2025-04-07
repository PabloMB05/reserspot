import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { ZoneLayout } from '@/layouts/zones/ZoneLayout';
import { ZoneForm } from '@/pages/zones/components/ZoneForm';
import { MapPin } from 'lucide-react';

interface ZoneFormProps {
    floors: {
        id:string,
        floor_number: number,
        capacity: number,
        zones_count:number,
    }[];
    genre:any[];
}

export default function CreateZone({ floors,genre}: ZoneFormProps) {
    const { t } = useTranslations();
    return (
        <ZoneLayout title={t('ui.zones.cards.create.title')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-full m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <MapPin color="#2762c2" />
                                {t('ui.zones.cards.create.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>
                            {t('ui.zones.cards.create.description')}
                        </CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4">
                        <ZoneForm floors={floors} genres={genre}  />
                    </CardContent>
                </Card>
            </div>
        </ZoneLayout>
    );
}