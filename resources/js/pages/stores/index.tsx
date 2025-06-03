import { PageProps } from '@inertiajs/core'
import { StoreCard } from '@/components/Stores/StoreCard'
import { StoreIcon, SearchIcon, ChevronsUpDown, Check } from 'lucide-react'
import { StoreLayout } from '@/layouts/store/storelayout'
import { useTranslations } from '@/hooks/use-translations'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import { cn } from '@/lib/utils'

interface Store {
  id: string | number
  name: string
  email?: string
  phone?: string
  website?: string
  store_category?: {
    id: string | number
    name: string
  }
}

interface ShoppingCenter {
  id: string | number
  name: string
  location: string
}

interface CategoryOption {
  id: string | number
  name: string
}

interface StoresIndexProps extends PageProps {
  shoppingCenter: ShoppingCenter
  stores: {
    data: Store[]
    current_page: number
    last_page: number
    links: { url: string | null; label: string; active: boolean }[]
  }
  filters?: {
    search?: string
    category?: string | number
  }
  categories: CategoryOption[]
}

export default function StoresIndex({
  shoppingCenter,
  stores,
  filters = {},
  categories,
}: StoresIndexProps) {
  const { t } = useTranslations()

  


  const [search, setSearch] = useState(filters.search || '')
  const [category, setCategory] = useState<string | number>(filters.category || '')
  const [categoryOpen, setCategoryOpen] = useState(false)

  const handleFilter = () => {
    router.visit(route('shopping-centers.stores.index', shoppingCenter?.id), {
      method: 'get',
      data: {
        search,
        category,
      },
      preserveState: false,
      preserveScroll: false,
    })
  }
 console.log('Tiendas cargadas:', stores.data.map(store => `ID: ${store.id} | Nombre: ${store.name}`));

  return (
    <StoreLayout title={t('ui.navigation.items.store')} centerName={shoppingCenter.name}>
      <div className="space-y-8 p-4 md:p-6 lg:p-8">
        {/* Filtros */}
        <div className="bg-card p-4 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">{t('ui.filters.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Buscar */}
            <div>
              <Label htmlFor="search">{t('ui.filters.search')}</Label>
              <Input
                id="search"
                value={filters.search}
                onChange={e => setFilters({ ...filters, search: e.target.value })}
                placeholder={t('ui.filters.search_placeholder')}
              />
              
            </div>

            {/* Categoría */}
            <div>
              <Label htmlFor="category">{t('ui.filters.category')}</Label>
              <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                <PopoverTrigger asChild>
                  <Button
  className="w-full justify-between rounded border bg-white text-black transition-colors 
             border-gray-300 hover:bg-[#f0fdfa]
             focus:outline-none focus:ring-2 focus:ring-[#20c997]/50 focus:border-[#20c997]"
>


  {category
  ? categories.find(c => c.id === category)?.name
  : t('ui.filters.select_category_placeholder')}
  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
</Button>

                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder={t('ui.filters.category_search_placeholder')} />
                    <CommandEmpty>{t('ui.filters.no_categories_found')}</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        key="all-categories"
                        value=""
                        onSelect={() => {
                          setCategory('')
                          setCategoryOpen(false)
                        }}
                        className="cursor-pointer text-black hover:bg-[#8ddcc2] hover:text-black !important"



                      >
                        {t('ui.zones.filters.all') || 'Todas las categorías'}
                      </CommandItem>
                      {categories.map(cat => (
                        <CommandItem
                          key={cat.id}
                          value={cat.id}
                          onSelect={() => {
                            setCategory(cat.id)
                            setCategoryOpen(false)
                          }}
                          className="cursor-pointer text-black hover:bg-[#8ddcc2] hover:text-black !important"



                        >
                          <Check className={cn('mr-2 h-4 w-4', category === cat.id ? 'opacity-100' : 'opacity-0')} />
                          {cat.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleFilter}>
              <SearchIcon className="h-4 w-4 mr-2" />
              {t('ui.actions.filter')}
            </Button>
          </div>
        </div>

        {/* Resultados */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-[#a8e6cf] rounded-lg shadow-sm">

            <div className="bg-primary/10 p-2 rounded-full">
              <StoreIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">{shoppingCenter.name}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm">
                <span className="text-muted-foreground">{shoppingCenter.location}</span>
                <span className="hidden sm:block text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {stores.data.length}{' '}
                  {stores.data.length === 1
                    ? t('ui.store.singlestore')
                    : t('ui.store.pluralstores')}
                </span>
              </div>
            </div>
          </div>

          {stores.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {stores.data.map((store) => (
                <StoreCard
                  key={`store-${store.id}-${store.name}`}

                  id={store.id}
                  name={store.name}
                  category={
                    store.store_category?.name
                      ? t(`ui.store.category.${store.store_category.name}`)
                      : 'Sin categoría'
                  }
                  shoppingCenter={shoppingCenter.name}
                  href={route('stores.show', store.id)}
                  icon={StoreIcon}
                  email={store.email}
                  phone={store.phone}
                  website={store.website}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#c2f1e3] rounded-lg p-6 text-center">

              <p className="text-muted-foreground">{t('ui.store.empty')}</p>
            </div>
          )}
        </section>

        {/* Paginación */}
        {stores.links.length > 3 && (
          <div className="flex justify-center items-center gap-2 pt-6">
            {stores.links.map((link, index) =>
              link.url ? (
                <Link
                  key={`${link.url ?? link.label}`}

                  href={link.url}
                  className={`px-3 py-1 rounded text-sm ${
                    link.active
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ) : (
                <span
                  key={`${link.url ?? link.label}`}

                  className="px-3 py-1 text-muted-foreground text-sm"
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              )
            )}
          </div>
        )}
      </div>
    </StoreLayout>
  )
}
