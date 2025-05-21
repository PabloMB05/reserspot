import { create } from 'zustand';
import { type Store } from '@/Domain/Store/Models/Store';

interface StoresState {
  stores: Store[];
  selectedStore: Store | null;
  searchQuery: string;
  selectedCategory: string | null;
  selectedFloor: string | null;
  isLoading: boolean;
  error: string | null;
  actions: {
    setStores: (stores: Store[]) => void;
    selectStore: (store: Store | null) => void;
    setSearchQuery: (query: string) => void;
    setSelectedCategory: (category: string | null) => void;
    setSelectedFloor: (floor: string | null) => void;
    fetchStores: () => Promise<void>;
  };
}

export const useStoresStore = create<StoresState>((set) => ({
  stores: [],
  selectedStore: null,
  searchQuery: '',
  selectedCategory: null,
  selectedFloor: null,
  isLoading: false,
  error: null,
  actions: {
    setStores: (stores) => set({ stores }),
    selectStore: (store) => set({ selectedStore: store }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setSelectedFloor: (floor) => set({ selectedFloor: floor }),
    fetchStores: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch('/api/stores');
        const data = await response.json();
        set({ stores: data, isLoading: false });
      } catch (err) {
        set({ error: 'Failed to fetch stores', isLoading: false });
      }
    },
  },
}));

// Selectores hooks para mejor rendimiento
export const useStores = () => useStoresStore((state) => state.stores);
export const useSelectedStore = () => useStoresStore((state) => state.selectedStore);
export const useStoreFilters = () => useStoresStore((state) => ({
  searchQuery: state.searchQuery,
  selectedCategory: state.selectedCategory,
  selectedFloor: state.selectedFloor,
}));
export const useStoreActions = () => useStoresStore((state) => state.actions);