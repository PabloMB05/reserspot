import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { type Store } from '@/types/stores';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';

interface StoreShowProps {
  store: Store;
}

export default function Show({ store }: StoreShowProps) {
  const { t } = useTranslations();

  return (
    <AppLayout>
      <Head title={store.name} />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{store.name}</h1>
                {store.category && (
                  <p className="text-gray-600 mt-2">{store.category.name}</p>
                )}
              </div>
              {store.website && (
                <a 
                  href={store.website} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visitar sitio web
                </a>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Información</h2>
                <div className="space-y-2">
                  {store.email && (
                    <p><strong>Email:</strong> {store.email}</p>
                  )}
                  {store.phone && (
                    <p><strong>Teléfono:</strong> {store.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
                <div className="space-y-2">
                  {store.locations.map((location) => (
                    <div key={location.id}>
                      <p><strong>Planta:</strong> {location.floor}</p>
                      {location.description && (
                        <p><strong>Descripción:</strong> {location.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Link href={`/shopping-center/${store.shoppingCenter.id}/stores`}>
            <Button variant="outline">
              ← Volver al listado
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Link href={`/stores/${store.id}/edit`}>
              <Button variant="outline">Editar</Button>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}