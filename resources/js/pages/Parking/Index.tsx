import { PageProps } from '@inertiajs/core';
import { ParkingMap } from '@/components/parking/ParkingMap';
import { ParkingReservationForm } from '@/pages/Parking/components/ParkingReservationForm';
import { useSelectedSpot, useParkingActions } from '@/hooks/parking/useParkingStore';

interface ParkingIndexProps extends PageProps {
  shoppingCenter: {
    id: string;
    name: string;
    floors: Array<{
      id: string;
      name: string;
      zones: Array<{
        id: string;
        name: string;
        parking_spots: Array<{
          id: string;
          spot_number: string;
          is_occupied: boolean;
        }>;
      }>;
    }>;
  };
}

export default function ParkingIndex({ shoppingCenter }: ParkingIndexProps) {
  const selectedSpot = useSelectedSpot();
  const { setSelectedSpot } = useParkingActions();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 overflow-auto">
        {/* Mapa de parking */}
        <div className="flex-1">
          <ParkingMap 
            floors={shoppingCenter.floors} 
            onSpotSelect={setSelectedSpot} 
          />
        </div>

        {/* Formulario de reserva */}
        <div className="lg:w-80">
          <ParkingReservationForm 
            spot={selectedSpot} 
            shoppingCenter={shoppingCenter}
          />
        </div>
      </div>
    </div>
  );
}
