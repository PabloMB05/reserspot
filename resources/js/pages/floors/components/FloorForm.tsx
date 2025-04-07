import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Building, Save, X } from 'lucide-react';
import { FormEvent } from 'react';
import { toast } from 'sonner';

interface FloorFormProps {
    initialData?: {
        id: string;
        floor_number: string;  // Cambiado de 'number' a 'floor_number'
        capacity: string;
    };
    page?: string;
    perPage?: string;
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
    const { t } = useTranslations();
    
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating ? <p className="text-muted-foreground mt-1 text-sm">{t('ui.validation.validating')}</p> : null}
        </>
    );
}

export function FloorForm({ initialData, page, perPage }: FloorFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    const form = useForm({
        defaultValues: {
            floor_number: initialData?.floor_number ?? '',  // Cambiado a floor_number
            capacity: initialData?.capacity ?? '',
        },
        onSubmit: async ({ value }) => {
            const floorData = {
                ...value,
            };

            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['floors'] });
                    let url = '/floors';
                    if (page) url += `?page=${page}`;
                    if (perPage) url += `&per_page=${perPage}`;
                    
                    router.visit(url);
                    toast.success(initialData ? t('messages.floors.updated') : t('messages.floors.created'));
                },
                onError: () => {
                    toast.error(initialData ? t('messages.floors.error.update') : t('messages.floors.error.create'));
                },
            };

            if (initialData) {
                router.put(`/floors/${initialData.id}`, floorData, options);
            } else {
                router.post('/floors', floorData, options);
            }
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.handleSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        {initialData ? t('ui.floor.edit') : t('ui.floor.create')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Floor number field */}
                    <div>
                        <form.Field
                            name="floor_number"  // Actualizado a floor_number
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    return !value
                                        ? t('ui.validation.required', { attribute: t('ui.floor.number').toLowerCase() })
                                        : isNaN(Number(value))
                                          ? t('ui.validation.number', { attribute: t('ui.floor.number').toLowerCase() })
                                          : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>
                                        {t('ui.floor.number')}
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="number"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t('ui.floor.number')}
                                        disabled={form.state.isSubmitting}
                                        required
                                        min = "1"
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>

                    {/* Capacity field */}
                    <div>
                        <form.Field
                            name="capacity"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    return !value
                                        ? t('ui.validation.required', { attribute: t('ui.floor.capacity').toLowerCase() })
                                        : isNaN(Number(value))
                                          ? t('ui.validation.number', { attribute: t('ui.floor.capacity').toLowerCase() })
                                          : Number(value) <= 0
                                            ? t('ui.validation.min.numeric', { 
                                                attribute: t('ui.floor.capacity').toLowerCase()
                                              })
                                            : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>
                                        {t('ui.floor.capacity')}
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="number"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t('ui.floor.capacity')}
                                        disabled={form.state.isSubmitting}
                                        required
                                        min="1"
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                let url = '/floors';
                                if (page) url += `?page=${page}`;
                                if (perPage) url += `&per_page=${perPage}`;
                                router.visit(url);
                            }}
                            disabled={form.state.isSubmitting}
                        >
                            <X className="mr-2 h-4 w-4" />
                            {t('ui.floor.buttons.cancel')}
                        </Button>

                        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                            {([canSubmit, isSubmitting]) => (
                                <Button type="submit" disabled={!canSubmit}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {isSubmitting
                                        ? t('ui.floor.buttons.save')
                                        : initialData
                                          ? t('ui.floor.buttons.update')
                                          : t('ui.floor.buttons.save')}
                                </Button>
                            )}
                        </form.Subscribe>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}