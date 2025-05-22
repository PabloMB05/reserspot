import { PageProps } from '@inertiajs/core'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { format } from 'date-fns'
import { StoreLayout } from '@/layouts/store/storelayout'
import { useTranslations } from '@/hooks/use-translations'

interface Event {
  id: string
  title: string
  description?: string
  start_time: string
  end_time?: string
  location?: string
  shopping_center: {
    id: string
    name: string
    location: string
  }
}

interface Props extends PageProps {
  event: Event
}

export default function EventsShow({ event }: Props) {
  const { t } = useTranslations()

  return (
    <StoreLayout title={event.title} centerName={event.shopping_center.name}>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <CalendarIcon className="w-5 h-5" />
          <h1 className="text-2xl font-bold">{event.title}</h1>
        </div>

        <p className="text-muted-foreground text-sm">
          {event.description || 'Sin descripción'}
        </p>

        <div className="text-sm space-y-1">
          <p><strong>Inicio:</strong> {format(new Date(event.start_time), 'PPPpp')}</p>
          {event.end_time && <p><strong>Fin:</strong> {format(new Date(event.end_time), 'PPPpp')}</p>}
          {event.location && (
            <p className="flex items-center gap-1">
              <MapPinIcon className="h-4 w-4" /> {event.location}
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-4 italic">
          Evento en {event.shopping_center.name} ({event.shopping_center.location})
        </p>
      </div>
    </StoreLayout>
  )
}
