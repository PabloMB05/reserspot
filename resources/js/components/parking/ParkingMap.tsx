import { Car } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
interface ParkingMapProps {
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
  onSpotSelect: (spot: {
    id: string;
    spot_number: string;
    is_occupied: boolean;
  }) => void;
}

export function ParkingMap({ floors, onSpotSelect }: ParkingMapProps) {
  const [selectedFloor, setSelectedFloor] = useState(floors[0] || null);
  const [selectedZone, setSelectedZone] = useState<null | typeof floors[0]['zones'][0]>(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 overflow-auto max-h-[80vh]">
      {/* Selector de planta */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <h3 className="font-semibold">Planta:</h3>
        {floors.map((floor) => (
          <Button
            key={floor.id}
            onClick={() => {
              setSelectedFloor(floor);
              setSelectedZone(null);
            }}
            className={`px-4 py-2 rounded-md ${
              selectedFloor?.id === floor.id ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            {floor.name}
          </Button>
        ))}
      </div>

      {selectedFloor && (
        <>
          {/* Selector de zona */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Zonas:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedFloor.zones?.map((zone) => (
                <Button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3 py-1 rounded-md ${
                    selectedZone?.id === zone.id ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}
                >
                  {zone.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Mapa de parking */}
          {selectedZone && (
            <div className="border rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-4">
                {selectedZone.name} - Planta {selectedFloor.name}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {selectedZone.parking_spots?.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => onSpotSelect(spot)}
                    disabled={spot.is_occupied}
                    className={`p-2 rounded-md flex flex-col items-center justify-center ${
                      spot.is_occupied
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    <Car className="h-6 w-6" />
                    <span>{spot.spot_number}</span>
                    <span className="text-xs mt-1">
                      {spot.is_occupied ? 'Ocupado' : 'Disponible'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
