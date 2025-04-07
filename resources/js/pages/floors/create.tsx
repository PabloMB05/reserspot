import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { FloorForm } from '@/pages/floors/components/FloorForm';
import { Building } from 'lucide-react';

interface FloorFormProps {
    initialData?: {
        id: string;
        floor_number: string;
        capacity: string;
    };
    zone_count: number;
    page?: string;
    perPage?: string;
}

export default function CreateFloor() {
    const { t } = useTranslations();

    return (
        <FloorLayout title={t('ui.floor.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-full m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Building color="#2762c2" />
                                {t('ui.floor.create')}
                            </div>
                        </CardTitle>
                        <CardDescription>
                            {t('ui.floor.create_description')}
                        </CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4">
                        <FloorForm />
                    </CardContent>
                </Card>
            </div>
        </FloorLayout>
    );
}