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
import { MapPin, Save, X } from 'lucide-react';
import { FormEvent } from 'react';
import { toast } from 'sonner';

interface ZoneFormProps {
    initialData?: {
        id: string;
        number: string;
        capacity: string;
        genre_name: string;
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

export function ZoneForm({ initialData, page, perPage }: ZoneFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    const form = useForm({
        defaultValues: {
            number: initialData?.number ?? '',
            capacity: initialData?.capacity ?? '',
            genre_name: initialData?.genre_name ?? '',
        },
        onSubmit: async ({ value }) => {
            const zoneData = {
                ...value,
                capacity: Number(value.capacity),
            };

            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['zones'] });
                    let url = '/zones';
                    if (page) url += `?page=${page}`;
                    if (perPage) url += `&per_page=${perPage}`;
                    
                    router.visit(url);
                    toast.success(initialData ? t('messages.zones.updated') : t('messages.zones.created'));
                },
                onError: () => {
                    toast.error(initialData ? t('messages.zones.error.update') : t('messages.zones.error.create'));
                },
            };

            if (initialData) {
                router.put(`/zones/${initialData.id}`, zoneData, options);
            } else {
                router.post('/zones', zoneData, options);
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
                        <MapPin className="h-5 w-5" />
                        {initialData ? t('ui.zone.edit') : t('ui.zone.create')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Zone number field */}
                    <div>
                        <form.Field
                            name="number"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    return !value
                                        ? t('ui.validation.required', { attribute: t('ui.zone.number').toLowerCase() })
                                        : isNaN(Number(value))
                                          ? t('ui.validation.number', { attribute: t('ui.zone.number').toLowerCase() })
                                          : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>
                                        {t('ui.zone.number')}
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="number"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t('ui.zone.number')}
                                        disabled={form.state.isSubmitting}
                                        required
                                        min="1"
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
                                        ? t('ui.validation.required', { attribute: t('ui.zone.capacity').toLowerCase() })
                                        : isNaN(Number(value))
                                          ? t('ui.validation.number', { attribute: t('ui.zone.capacity').toLowerCase() })
                                          : Number(value) <= 0
                                            ? t('ui.validation.min.numeric', { 
                                                attribute: t('ui.zone.capacity').toLowerCase()
                                              })
                                            : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>
                                        {t('ui.zone.capacity')}
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="number"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t('ui.zone.capacity')}
                                        disabled={form.state.isSubmitting}
                                        required
                                        min="1"
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>

                    {/* Genre name field */}
                    <div>
                        <form.Field
                            name="genre_name"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    return !value
                                        ? t('ui.validation.required', { attribute: t('ui.zone.genre').toLowerCase() })
                                        : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>
                                        {t('ui.zone.genre')}
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t('ui.zone.genre')}
                                        disabled={form.state.isSubmitting}
                                        required
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
                                let url = '/zones';
                                if (page) url += `?page=${page}`;
                                if (perPage) url += `&per_page=${perPage}`;
                                router.visit(url);
                            }}
                            disabled={form.state.isSubmitting}
                        >
                            <X className="mr-2 h-4 w-4" />
                            {t('ui.common.buttons.cancel')}
                        </Button>

                        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                            {([canSubmit, isSubmitting]) => (
                                <Button type="submit" disabled={!canSubmit}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {isSubmitting
                                        ? t('ui.common.buttons.saving')
                                        : initialData
                                          ? t('ui.common.buttons.update')
                                          : t('ui.common.buttons.save')}
                                </Button>
                            )}
                        </form.Subscribe>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}