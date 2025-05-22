import { PageProps } from '@inertiajs/core'
import { EventCard } from '@/components/Events/EventCard'
import { CalendarIcon } from 'lucide-react'
import { StoreLayout } from '@/layouts/store/storelayout' // O crea EventLayout si es necesario
import { useTranslations } from '@/hooks/use-translations'

interface Event {
  id: string
  title: string
  description?: string
  start_time: string
  end_time?: string
  location?: string
}

interface ShoppingCenter {
  id: string
  name: string
  location: string
  events: Event[]
}

interface EventsIndexProps extends PageProps {
  shoppingCenter?: ShoppingCenter
  shoppingCenters?: ShoppingCenter[]
}

export default function EventsIndex({ shoppingCenter, shoppingCenters }: EventsIndexProps) {
  const centers: ShoppingCenter[] = shoppingCenters ?? (shoppingCenter ? [shoppingCenter] : [])
  const { t } = useTranslations()

  const centerName = centers.length === 1 ? centers[0].name : undefined

  return (
    <StoreLayout title={t('ui.navigation.items.event')} centerName={centerName}>
      <div className="space-y-8 p-4 md:p-6 lg:p-8">
        <div className="space-y-8">
          {centers.map((center) => (
            <section key={center.id} className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg shadow-sm">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold">{center.name}</h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm">
                    <span className="text-muted-foreground">{center.location}</span>
                    <span className="hidden sm:block text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {center.events.length} {center.events.length === 1 ? t('ui.event.single') : t('ui.event.plural')}
                    </span>
                  </div>
                </div>
              </div>

              {center.events.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                  {center.events.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.title}
                      description={event.description}
                      start_time={event.start_time}
                      end_time={event.end_time}
                      location={event.location}
                      shoppingCenter={center.name}
                      href={route('events.show', event.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <p className="text-muted-foreground">
                    Este centro comercial no tiene eventos registrados.
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </StoreLayout>
  )
}
