import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { BookOpen, Save, X } from 'lucide-react';
import { FormEvent } from 'react';
import { toast } from 'sonner';
import { Building2 } from 'lucide-react';
import { Icon } from '@/components/icon';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isAfter, isValid, parseISO } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import type { AnyFieldApi } from '@tanstack/react-form';

interface EditLoanProps {
    loan?: {
        id: string;
        due_date: Date;
    };
    user_email?: string;  // Cambiado de email a user_email
    book_isbn?: string;  // Cambiado de isbn a book_isbn
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

export function LoanForm({ loan, book_isbn, user_email,page, perPage }: EditLoanProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    console.log(user_email);
    // Helper function to parse the date string from backend
    const parseDueDate = (dateString: string | undefined): string => {
        if (!dateString) return '';
        
        // Handle the 'dd/MM/yyyy' format
        if (dateString.includes('/')) {
            const [day, month, year] = dateString.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        
        // Assume it's already in 'yyyy-MM-dd' format
        return dateString;
    };

    const form = useForm({
        defaultValues: {
            user_email: user_email ?? '',  // Usamos user_email
            book_isbn: book_isbn ?? '',    // Usamos book_isbn
            due_date: loan?.due_date ? parseDueDate(loan.due_date) : '',
        },
        onSubmit: async ({ value }) => {
            const loanData = {
                ...value,
            };

            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['loans'] });
                    let url = '/loans';
                    if (page) url += `?page=${page}`;
                    if (perPage) url += `&per_page=${perPage}`;
                    router.visit(url);
                    toast.success(t('messages.loans.created'));
                },
                onError: (err) => {
                    console.error('Create loan error:', err);
                    toast.error(t('messages.loans.error.create'));
                },
            };

            if (loan?.id) {
                router.put(`/loans/${loan.id}`, loanData, options);
            } else {
                router.post('/loans', loanData, options);
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
                        <BookOpen className="h-5 w-5" />
                        {t(loan?.id ? 'ui.loan.edit' : 'ui.loan.create')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Email field - Solo lectura cuando se edita */}
                    <div>
                        <form.Field
                            name="user_email"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    if (loan?.id) return undefined; // No validamos en edición
                                    
                                    await new Promise((r) => setTimeout(r, 300));
                                    return !value
                                        ? t('ui.validation.required', { attribute: t('ui.user.email') })
                                        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                        ? t('ui.validation.email')
                                        : undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>{t('ui.user.email')}</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="email"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)} // Solo permite cambios si no es edición
                                        onBlur={field.handleBlur}
                                        placeholder={user_email}
                                        disabled={form.state.isSubmitting || !!loan?.id} // Deshabilitado en edición
                                    />
                                    <FieldInfo field={field} />
                                </>
                            )}
                        </form.Field>
                    </div>

                    {/* ISBN field - Solo lectura cuando se edita */}
                    <div>
                        <form.Field
                            name="book_isbn"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    if (loan?.id) return undefined; // No validamos en edición
                                    
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    if (!value) {
                                        return t('ui.validation.required', {
                                            attribute: t('ui.loans.fields.isbn').toLowerCase(),
                                        });
                                    }
                                    if (!/^\d+$/.test(value)) {
                                        return t('ui.validation.numeric', {
                                            attribute: t('ui.books.columns.isbn').toLowerCase(),
                                        });
                                    }
                                    return undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon iconNode={Building2} className="w-5 h-5" />
                                        <Label htmlFor={field.name}>{t('ui.loans.fields.isbn')}</Label>
                                    </div>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)} // Solo permite cambios si no es edición
                                        onBlur={field.handleBlur}
                                        placeholder={book_isbn}
                                        disabled={form.state.isSubmitting || !!loan?.id} // Deshabilitado en edición
                                     
                                       
                                        autoComplete="off"
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        </form.Field>
                    </div>

                    {/* Due Date field - Siempre editable */}
                    <div>
                        <form.Field
                            name="due_date"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((r) => setTimeout(r, 300));

                                    if (!value) {
                                        return t('ui.validation.required', { attribute: t('ui.loan.due_date') });
                                    }

                                    const parsedDate = parseISO(value);
                                    if (!isValid(parsedDate)) {
                                        return t('ui.validation.date', { attribute: t('ui.loan.due_date') });
                                    }

                                    if (!isAfter(parsedDate, new Date())) {
                                        return t('ui.validation.after_today', { attribute: t('ui.loan.due_date') });
                                    }

                                    return undefined;
                                },
                            }}
                        >
                            {(field) => {
                                const date = field.state.value ? parseISO(field.state.value) : null;

                                return (
                                    <>
                                        <Label htmlFor={field.name}>{t('ui.loan.due_date')}</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="w-full text-left flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                                                    disabled={form.state.isSubmitting}
                                                >
                                                    {date ? format(date, 'PPP') : t('ui.loan.createLoan.placeholders.date')}
                                                    <CalendarIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    timeZone="Europe/Madrid"
                                                    selected={date ?? undefined}
                                                    onSelect={(selectedDate) => {
                                                        if (selectedDate) {
                                                            const iso = selectedDate.toISOString().split('T')[0];
                                                            field.handleChange(iso);
                                                        }
                                                    }}
                                                    disabled={(date) => date < new Date()}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FieldInfo field={field} />
                                    </>
                                );
                            }}
                        </form.Field>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                let url = '/loans';
                                if (page) url += `?page=${page}`;
                                if (perPage) url += `&per_page=${perPage}`;
                                router.visit(url);
                            }}
                            disabled={form.state.isSubmitting}
                        >
                            <X className="mr-2 h-4 w-4" />
                            {t('ui.loan.buttons.cancel')}
                        </Button>

                        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                            {([canSubmit, isSubmitting]) => (
                                <Button type="submit" disabled={!canSubmit}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {isSubmitting ? t('ui.loan.buttons.saving') : t(loan?.id ? 'ui.loan.buttons.update' : 'ui.loan.buttons.save')}
                                </Button>
                            )}
                        </form.Subscribe>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}