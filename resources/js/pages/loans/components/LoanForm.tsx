import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { format, isSunday } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Box, CalendarIcon, Layers2, Save, X } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { toast } from 'sonner';

interface LoanFormProps {
    initialData?: {
        id: string;
        book_id: string;
        user_id: string;
        is_overdue: boolean;
        is_active: boolean;
        hours_between: number;
        hoursDue_between: number;
        created_at: string;
        returned_at: string;
        due_date: string;
    };
    usermail?: string;
    bookIDButton?: string;
    ddate?: string;
    emailList: string[];
    page?: string;
    perPage?: string;
    lang: string;
}

// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating ? <p className="text-muted-foreground mt-1 text-sm">Validating...</p> : null}
        </>
    );
}

export function LoanForm({ initialData, page, perPage, bookIDButton, lang, emailList, usermail, ddate }: LoanFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    const comprobanteButton = bookIDButton !== null;
    const comprobanteEmail = usermail !== undefined;

    let fecha: Date;

    if (ddate) {
        fecha = new Date(ddate); // month is 0-indexed
      } else {
        fecha = new Date(); // fallback
        fecha.setDate(fecha.getDate() + 1);

      }




    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            book: initialData?.book_id ?? bookIDButton ?? undefined,
            user: usermail ?? undefined,
            dueDate: fecha ?? undefined,
        },
        onSubmit: async ({ value }) => {
            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Prestamo creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['loans'] });

                    // Construct URL with page parameters
                    let url = '/loans';
                    if (page) {
                        url += `?page=${page}`;
                        if (perPage) {
                            url += `&per_page=${perPage}`;
                        }
                    }

                    router.visit(url);
                },
                onError: (errors: Record<string, string>) => {
                    if (Object.keys(errors).length === 0) {
                        toast.error(initialData ? t('ui.messages.loans.error.update') : t('ui.messages.loans.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/loans/${initialData.id}`, value, options);
            } else {
                router.post('/loans', value, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    const langMap = {
        en: enUS,
        es: es,
      };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
                {/* Book field */}
                <div>
                    <form.Field
                        name="book"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.loans.fields.book').toLowerCase() }) : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <Layers2 color="grey" size={18} />
                                        {t('ui.loans.fields.book')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.loans.placeholders.book')}
                                    disabled={comprobanteButton || form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* User field */}
                <div>
                    <form.Field
                        name="user"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.loans.fields.user').toLowerCase() }) :
                                !emailList.includes(value) ? t('ui.validation.userEmail', { attribute: t('ui.loans.fields.user').toLowerCase() }) :
                                undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <Box color="grey" size={18} />
                                        {t('ui.loans.fields.user')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.loans.placeholders.user')}
                                    disabled={comprobanteEmail || form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* Due Date field */}
                <div>
                    <form.Field
                        name="dueDate"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.loans.fields.duedate').toLowerCase() }) :
                                value <= new Date ? t('ui.validation.pastDueDate', { attribute: t('ui.loans.fields.duedate').toLowerCase() }) :
                                isSunday(value) ? t('ui.validation.sunday', { attribute: t('ui.loans.fields.duedate').toLowerCase() }) :
                                undefined;

                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <Box color="grey" size={18} />
                                        {t('ui.loans.fields.duedate')}
                                    </div>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn('w-[240px] justify-start text-left font-normal', !field.state.value && 'text-muted-foreground')}
                                        >
                                            <CalendarIcon />
                                            {field.state.value ? format(field.state.value, 'PPP', {locale: langMap[lang]}) : <span>{t('ui.loans.utils.pickDate')}</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                    animate
                                    mode="single"
                                    locale={langMap[lang]}
                                    disabled={[{ before: new Date() }, new Date(), isSunday]}
                                    timeZone="Europe/Madrid"
                                    selected={field.state.value}
                                    onSelect={(value) => field.handleChange(value)}
                                    />
                                    </PopoverContent>
                                </Popover>
                                {/* <DayPicker
                                    animate
                                    mode="single"
                                    locale={langMap[lang]}
                                    disabled={[{ before: new Date() }, new Date()]}
                                    timeZone="Europe/Madrid"
                                    selected={field.state.value}
                                    onSelect={(value) => field.handleChange(value)}
                                /> */}
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* Form buttons */}
                <div className="mt-3 mt-4 flex justify-center gap-100">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = '/loans';
                            if (page) {
                                url += `?page=${page}`;
                                if (perPage) {
                                    url += `&per_page=${perPage}`;
                                }
                            }
                            router.visit(url);
                        }}
                        disabled={form.state.isSubmitting}
                    >
                        <X />
                        {t('ui.loans.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.loans.buttons.saving')
                                    : initialData
                                      ? t('ui.loans.buttons.update')
                                      : t('ui.loans.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}