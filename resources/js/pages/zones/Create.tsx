import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { ZoneLayout } from '@/layouts/zones/ZoneLayout';
import { ZoneForm } from '@/pages/zones/components/ZoneForm';
import { MapPin } from 'lucide-react';

interface ZoneFormProps {
    initialData?: {
        id: string;
        name: string;
        description: string;
        floor_id: string;
    };
    page?: string;
    perPage?: string;
}

export default function CreateZone() {
    const { t } = useTranslations();

    return (
        <ZoneLayout title={t('ui.zone.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-full m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <MapPin color="#2762c2" />
                                {t('ui.zone.create')}
                            </div>
                        </CardTitle>
                        <CardDescription>
                            {t('ui.zone.create_description')}
                        </CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4">
                        <ZoneForm />
                    </CardContent>
                </Card>
            </div>
        </ZoneLayout>
    );
}