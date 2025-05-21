import { PageProps } from '@inertiajs/core'
import { StoreCard } from '@/components/Stores/StoreCard'
import { StoreIcon } from 'lucide-react'
import { StoreLayout } from '@/layouts/store/storelayout'
import { useTranslations } from '@/hooks/use-translations';

interface Store {
  id: string | number
  name: string
  email?: string
  phone?: string
  website?: string
  store_category?: {
    name: string
  }
}

interface ShoppingCenter {
  id: string
  name: string
  location: string
  stores: Store[]
}

interface StoresIndexProps extends PageProps {
  shoppingCenter?: ShoppingCenter
  shoppingCenters?: ShoppingCenter[]
}

export default function StoresIndex({ shoppingCenter, shoppingCenters }: StoresIndexProps) {
  const centers: ShoppingCenter[] = shoppingCenters ?? (shoppingCenter ? [shoppingCenter] : [])
  const { t } = useTranslations();

  // Si solo se está mostrando un centro, se puede pasar su nombre al layout
  const centerName = centers.length === 1 ? centers[0].name : undefined;

  return (
    <StoreLayout title={t('ui.navigation.items.store')} centerName={centerName}>
      <div className="space-y-8 p-4 md:p-6 lg:p-8">

        <div className="space-y-8">
          {centers.map((center) => (
            <section key={center.id} className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg shadow-sm">
                <div className="bg-primary/10 p-2 rounded-full">
                  <StoreIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold">{center.name}</h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm">
                    <span className="text-muted-foreground">{center.location}</span>
                    <span className="hidden sm:block text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {center.stores.length} {center.stores.length === 1 ? t('ui.store.singlestore') : t('ui.store.pluralstores')}
                    </span>
                  </div>
                </div>
              </div>

              {center.stores.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                  {center.stores.map((store) => (
                    <StoreCard
                      key={store.id}
                      id={store.id}
                      name={store.name}
                      category={t(`ui.store.category.${store.store_category?.name}`) || 'Sin categoría'}
                      shoppingCenter={center.name}
                      href={route('stores.show', store.id)}
                      icon={StoreIcon}
                      email={store.email}
                      phone={store.phone}
                      website={store.website}
                      
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <p className="text-muted-foreground">
                    Este centro comercial no tiene tiendas registradas.
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </StoreLayout>
  );
}
