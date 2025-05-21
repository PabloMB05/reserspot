declare interface Store {
  id: string;
  name: string;
  website?: string;
  email?: string;
  phone?: string;
  category?: {
    id: string;
    name: string;
  };
  locations: Array<{
    id: string;
    floor: string;
    description?: string;
  }>;
  shoppingCenter: {
    id: string;
    name: string;
    location: string;
  };
}

declare interface StoreFilters {
  search?: string;
  category?: string;
  floor?: string;
}