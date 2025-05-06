import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Hash, LandPlot, Layers, Save, X } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface BookcaseFormProps {
  initialData?: {
    id: string;
    number: number;
    capacity: number;
    zone_id: string;
  };
  floors: {
    id: string;
    floor_number: number;
  }[];
  zones: {
    id: string;
    number: number;
    genre_name: string;
    capacity: number;
    floor_id: string;
    bookcases_count: number;
  }[];
  page?: string;
  perPage?: string;
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className="text-destructive mt-1 text-sm">
          {field.state.meta.errors.join(', ')}
        </p>
      ) : null}
      {field.state.meta.isValidating ? (
        <p className="text-muted-foreground mt-1 text-sm">Validating...</p>
      ) : null}
    </>
  );
}

export function BookcaseForm({
  initialData,
  page,
  perPage,
  floors,
  zones,
}: BookcaseFormProps) {
  const { t } = useTranslations();
  const queryClient = useQueryClient();

  let prePisoId = undefined;
  if (initialData?.zone_id) {
    prePisoId = zones.find((zone) => zone.id === initialData.zone_id)?.floor_id;
  }

  const [selectedFloor, setSelectedFloor] = useState<string | undefined>(prePisoId);
  const [selectedZone, setSelectedZone] = useState<string | undefined>(
    initialData?.zone_id
  );

  const form = useForm({
    defaultValues: {
      zone_id: initialData?.zone_id ?? '',
      number: initialData?.number ?? '',
      capacity: initialData?.capacity ?? '',
    },
    onSubmit: async ({ value }) => {
      const options = {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['bookcases'] });
          let url = '/bookcases';
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
            toast.error(
              initialData
                ? t('messages.bookcases.error.update')
                : t('messages.bookcases.error.create')
            );
          }
        },
      };
      if (initialData) {
        router.put(`/bookcases/${initialData.id}`, value, options);
      } else {
        router.post('/bookcases', value, options);
      }
    },
  });

  const handleFloorChange = (floorId: string) => {
    setSelectedFloor(floorId);
    setSelectedZone(undefined);
    form.setFieldValue('zone_id', '');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  const handleNumberChange = (value: string) => {
    if (parseInt(value) < 0) return;
    form.setFieldValue('number', value);
  };

  const handleCapacityChange = (value: string) => {
    if (parseInt(value) < 0) return;
    form.setFieldValue('capacity', value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field name="number" validators={{}}>
          {(field) => (
            <div>
              <Label htmlFor={field.name} className="flex items-center gap-1 mb-1">
                <Hash size={18} className="text-gray-500" />
                {t('ui.bookcases.fields.bookcase')}
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                min="0"
                step="1"
                value={field.state.value}
                onChange={(e) => handleNumberChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder={t('ui.bookcases.placeholders.bookcase')}
                disabled={form.state.isSubmitting}
                className="w-full"
                autoComplete="off"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <div>
          <Label className="flex items-center gap-1 mb-1">
            <Layers size={18} className="text-gray-500" />
            {t('ui.bookcases.fields.floor')}
          </Label>
          <Select value={selectedFloor} onValueChange={handleFloorChange} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('ui.bookcases.fields.floor')} />
            </SelectTrigger>
            <SelectContent>
              {floors.map((floor) => (
                <SelectItem key={floor.id} value={floor.id}>
                  {t('ui.bookcases.fields.floor')} {floor.floor_number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <form.Field
          name="zone_id"
          validators={{
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              return !value
                ? t('ui.validation.required', {
                    attribute: t('ui.bookcases.fields.zone').toLowerCase(),
                  })
                : null;
            },
          }}
        >
          {(field) => (
            <div className="md:col-span-2">
              <Label htmlFor={field.name} className="flex items-center gap-1 mb-1">
                <LandPlot size={18} className="text-gray-500" />
                {t('ui.bookcases.fields.zone')}
              </Label>
              <Select
                value={selectedZone}
                onValueChange={(value) => {
                  setSelectedZone(value);
                  field.handleChange(value);
                }}
                disabled={!selectedFloor}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('ui.bookcases.fields.zone')} />
                </SelectTrigger>
                <SelectContent>
                  {zones
                    .filter((zone) => zone.floor_id === selectedFloor)
                    .map((zone) => (
                      <SelectItem
                        key={zone.id}
                        value={zone.id}
                        disabled={zone.bookcases_count >= zone.capacity}
                      >
                        {`${t('ui.bookcases.fields.zone')} ${zone.number} - ${t(
                          `ui.genres.names.${zone.genre_name}`
                        )} ${zone.bookcases_count >= zone.capacity ? '- Full' : '- Available'}`}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name="capacity"
          validators={{
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              return !value
                ? t('ui.validation.required', {
                    attribute: t('ui.bookcases.fields.capacity').toLowerCase(),
                  })
                : null;
            },
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor={field.name} className="flex items-center gap-1 mb-1">
                <Box size={18} className="text-gray-500" />
                {t('ui.bookcases.fields.capacity')}
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                min="0"
                step="1"
                value={field.state.value}
                onChange={(e) => handleCapacityChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder={t('ui.bookcases.placeholders.capacity')}
                disabled={form.state.isSubmitting}
                className="w-full"
                autoComplete="off"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            let url = '/bookcases';
            if (page) {
              url += `?page=${page}`;
              if (perPage) url += `&per_page=${perPage}`;
            }
            router.visit(url);
          }}
          disabled={form.state.isSubmitting}
        >
          <X />
          {t('ui.buttons.cancel')}
        </Button>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              <Save />
              {isSubmitting
                ? t('ui.buttons.saving')
                : initialData
                  ? t('ui.buttons.update')
                  : t('ui.buttons.save')}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
