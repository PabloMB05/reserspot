import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Link } from '@inertiajs/react'

interface EventCardProps {
  title: string
  description?: string
  start_time: string
  end_time?: string
  location?: string
  shoppingCenter: string
  href: string
}

export function EventCard({
  title,
  description,
  start_time,
  end_time,
  location,
  shoppingCenter,
  href,
}: EventCardProps) {
  return (
    <Link href={href} className="block p-4 bg-card rounded-lg shadow-sm hover:shadow transition space-y-2">
      <div className="flex items-center gap-2 text-primary">
        <CalendarIcon className="h-5 w-5" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <div className="text-sm text-muted-foreground">
        <p><strong>Inicio:</strong> {format(new Date(start_time), 'PPPpp')}</p>
        {end_time && <p><strong>Fin:</strong> {format(new Date(end_time), 'PPPpp')}</p>}
        {location && (
          <p className="flex items-center gap-1 mt-1">
            <MapPinIcon className="h-4 w-4" /> {location}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-2 italic">Centro comercial: {shoppingCenter}</p>
      </div>
    </Link>
  )
}
