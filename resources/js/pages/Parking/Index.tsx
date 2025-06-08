import { PageProps } from '@inertiajs/core';
import { ParkingMap } from '@/components/parking/ParkingMap';
import { ParkingReservationForm } from '@/pages/Parking/components/ParkingReservationForm';
import { useSelectedSpot, useParkingActions } from '@/hooks/parking/useParkingStore';
import { ParkingLayout } from '@/layouts/parking/ParkingLayout';
import { useTranslations } from "@/hooks/use-translations";

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
  const { t } = useTranslations();
  return (
    <ParkingLayout title={t('ui.navigation.items.parking')}>
      <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Título */}
          <h1 className="text-2xl font-semibold mb-4">
            Parking - {shoppingCenter.name}
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 overflow-auto">
            {/* Mapa de parking */}
            <div className="flex-1">
              <ParkingMap 
                floors={shoppingCenter.floors} 
                onSpotSelect={setSelectedSpot} 
              />
            </div>

            {/* Formulario de reserva */}
            <div className="lg:w-80 bg-white dark:bg-zinc-900 rounded-xl shadow-md p-4">
              <ParkingReservationForm 
                spot={selectedSpot} 
                shoppingCenter={shoppingCenter}
              />
            </div>
          </div>
        </div>
      </div>
    </ParkingLayout>
  );
}
