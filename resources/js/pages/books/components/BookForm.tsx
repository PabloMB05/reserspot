'use client';

import { useEffect, FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { BookOpen, Save, X, CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Icon } from '@/components/icon';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isAfter, isValid, parseISO } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LoanFormProps {
  initialData?: {
    id?: number;
    email: string;
    isbn: string;
    due_date: string | Date;
  };
  page?: string;
  perPage?: string;
}

function getFormattedDueDate(dueDate: unknown): string {
  if (!dueDate) return '';
  const dateObj =
    typeof dueDate === 'string' ? parseISO(dueDate) : dueDate instanceof Date ? dueDate : null;
  if (dateObj && isValid(dateObj)) {
    return format(dateObj, 'yyyy-MM-dd');
  }
  return '';
}

export function LoanForm({ initialData, page, perPage }: LoanFormProps) {
  const { t } = useTranslations();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('basic');

  const form = useForm({
    defaultValues: {
      email: '',
      isbn: '',
      due_date: '',
    },
    onSubmit: async ({ value }) => {
      const loanData = { ...value };

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

      if (initialData?.id) {
        router.put(`/loans/${initialData.id}`, loanData, options);
      } else {
        router.post('/loans', loanData, options);
      }
    },
  });

  // Sync initial data for editing mode
  useEffect(() => {
    if (initialData) {
      form.setFieldValue('email', initialData.email ?? '');
      form.setFieldValue('isbn', initialData.isbn ?? '');
      form.setFieldValue('due_date', getFormattedDueDate(initialData.due_date));
    }
  }, [initialData]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">
            <BookOpen className="mr-2 h-4 w-4" />
            {t('ui.loan.tabs.basic')}
          </TabsTrigger>
          {/* Location tab is omitted as it's not relevant in this case */}
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          {/* Email field */}
          <div>
            <form.Field
              name="email"
              validators={{
                onChangeAsync: async ({ value }) => {
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
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{t('ui.user.email')}</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={initialData?.email || 'user@example.com'}
                    disabled={form.state.isSubmitting}
                    required
                  />
                </div>
              )}
            </form.Field>
          </div>

          {/* ISBN field */}
          <div>
            <form.Field
              name="isbn"
              validators={{
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  if (!value) {
                    return t('ui.validation.required', { attribute: t('ui.loans.fields.isbn') });
                  }
                  if (!/^\d+$/.test(value)) {
                    return t('ui.validation.numeric', { attribute: t('ui.books.columns.isbn') });
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{t('ui.loans.fields.isbn')}</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={initialData?.isbn || '9781234567890'}
                    disabled={form.state.isSubmitting}
                    autoComplete="off"
                  />
                </div>
              )}
            </form.Field>
          </div>

          {/* Due Date field */}
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
                    return t('ui.validation.after_today', {
                      attribute: t('ui.loan.due_date'),
                    });
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
                        >
                          {date && isValid(date)
                            ? format(date, 'PPP')
                            : t('ui.loan.createLoan.placeholders.date')}
                          <CalendarIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
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
                  </>
                );
              }}
            </form.Field>
          </div>

          <Separator className="my-4" />

          {/* Form buttons */}
          <div className="flex justify-end gap-4 pt-4">
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
              <X className="mr-2 h-4 w-4" />
              {t('ui.loan.buttons.cancel')}
            </Button>

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting
                    ? t('ui.loan.buttons.saving')
                    : initialData
                    ? t('ui.loan.buttons.update')
                    : t('ui.loan.buttons.save')}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
