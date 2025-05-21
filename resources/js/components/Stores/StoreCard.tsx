import { Link } from "@inertiajs/react";
import { LucideIcon } from "lucide-react";
import { useTranslations } from '@/hooks/use-translations';
interface StoreCardProps {
  id: string;
  name: string;
  category: string;
  shoppingCenter: string;
  href: string;
  icon: LucideIcon;
  email?: string;
  phone?: string;
  website?: string;
}

export function StoreCard({
  id,
  name,
  category,
  shoppingCenter,
  href,
  icon: Icon,
  email,
  phone,
  website,
}: StoreCardProps) {
  const { t } = useTranslations();
  return (
    <Link
      href={href}
      className="group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all hover:shadow-md hover:border-primary/30 dark:hover:border-primary/50"
    >
      {/* Contenedor principal */}
      <div className="h-full flex flex-col">
        {/* Header - común para todos los dispositivos */}
        <div className="p-4 pb-0 flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate text-base sm:text-lg">
              {name}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-1">
              <span className="bg-gray-100 dark:bg-gray-800 text-xs px-2 py-1 rounded-full">
                {category}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido - diferente por dispositivo */}
        <div className="p-4 pt-3 flex-1">
          {/* Móvil: Diseño vertical compacto */}
          <div className="sm:hidden space-y-2 text-sm">
            <div className="text-gray-500 dark:text-gray-400 truncate">
              <span className="font-medium">{t('ui.store.card.centro')}:</span> {shoppingCenter}
            </div>
            {email && (
              <div className="truncate">
                <span className="text-gray-500 dark:text-gray-400">✉️</span> {email}
              </div>
            )}
            {phone && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">📞</span> {phone}
              </div>
            )}
            {website && (
              <div className="truncate text-primary hover:underline">
                <span className="text-gray-500 dark:text-gray-400">🌐</span>{" "}
                {website.replace(/^https?:\/\//, "").split("/")[0]}
              </div>
            )}
          </div>

          {/* Tablet: 2 columnas */}
          <div className="hidden sm:block md:hidden space-y-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {shoppingCenter}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {email && (
                <div className="truncate">
                  <span className="text-gray-500 dark:text-gray-400">{t('ui.store.card.email')}:</span> {email}
                </div>
              )}
              {phone && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">{t('ui.store.card.tel')}:</span> {phone}
                </div>
              )}
              {website && (
                <div className="col-span-2 truncate text-primary hover:underline">
                  <span className="text-gray-500 dark:text-gray-400">{t('ui.store.card.web')}:</span>{" "}
                  {website.replace(/^https?:\/\//, "").split("/")[0]}
                </div>
              )}
            </div>
          </div>

          {/* Ordenador: 3 columnas */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="text-gray-600 dark:text-gray-300 truncate">
                <div className="font-medium">{t('ui.store.card.centro')}</div>
                <div className="truncate">{shoppingCenter}</div>
              </div>
              <div className="truncate">
                <div className="font-medium text-gray-600 dark:text-gray-300">{t('ui.store.card.contact')}</div>
                {email && <div className="truncate">{email}</div>}
                {phone && <div>{phone}</div>}
              </div>
              {website && (
                <div className="truncate">
                  <div className="font-medium text-gray-600 dark:text-gray-300">{t('ui.store.card.web')}</div>
                  <a
                    href={website.startsWith("http") ? website : `https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {website.replace(/^https?:\/\//, "").split("/")[0]}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - ID solo en desktop */}
        <div className="px-4 pb-3 hidden md:block">
          <div className="text-xs text-gray-500 dark:text-gray-400">ID: {id}</div>
        </div>
      </div>
    </Link>
  );
}