// src/stores/useParkingStore.ts
import { create } from 'zustand';

interface ParkingSpot {
  id: string;
  spot_number: string;
  is_occupied: boolean;
}

interface ParkingState {
  selectedSpot: ParkingSpot | null;
  actions: {
    setSelectedSpot: (spot: ParkingSpot | null) => void;
  };
}

export const useParkingStore = create<ParkingState>((set) => ({
  selectedSpot: null,
  actions: {
    setSelectedSpot: (spot) => set({ selectedSpot: spot }),
  },
}));

// Hooks para acceder fácilmente al estado y acciones
export const useSelectedSpot = () => useParkingStore((state) => state.selectedSpot);
export const useParkingActions = () => useParkingStore((state) => state.actions);
