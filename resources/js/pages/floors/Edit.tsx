import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { FloorForm } from '@/pages/floors/components/FloorForm';
import { PageProps } from '@inertiajs/core';
import { Building } from 'lucide-react';

interface EditFloorProps extends PageProps {
    floor: {
        id: string;
        floor_number: string;
        capacity: string;
        created_at?: string;
        updated_at?: string;
    };
    page?: string;
    perPage?: string;
}

export default function EditFloor({ floor, page, perPage }: EditFloorProps) {
    const { t } = useTranslations();

    return (
        <FloorLayout title={t('ui.floor.edit')}>
            <div className="flex max-w-screen-lg items-center self-center">
                <Card className="w-full m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Building className="text-blue-600" />
                                {t('ui.floor.edit_title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.floor.edit_description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <FloorForm
                            initialData={floor ?? { id: '', floor_number: '', capacity: '' }}
                            page={page}
                            perPage={perPage}
                        />
                    </CardContent>
                </Card>
            </div>
        </FloorLayout>
    );
}
