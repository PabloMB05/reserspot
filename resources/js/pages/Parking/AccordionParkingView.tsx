import { useState } from 'react';
import { Car } from 'lucide-react';

interface ParkingSpot {
  id: string;
  spot_number: string;
  is_occupied: boolean;
}

interface Zone {
  id: string;
  name: string;
  parking_spots: ParkingSpot[];
}

interface Floor {
  id: string;
  name: string;
  zones: Zone[];
}

interface AccordionParkingViewProps {
  floors: Floor[];
  onSpotSelect?: (spot: ParkingSpot) => void;
}

export function AccordionParkingView({ floors, onSpotSelect }: AccordionParkingViewProps) {
  const [expandedFloor, setExpandedFloor] = useState<string | null>(null);
  const [expandedZone, setExpandedZone] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-md shadow p-4 space-y-4">
      {floors.map((floor) => (
        <div key={floor.id}>
          <button
            onClick={() =>
              setExpandedFloor(expandedFloor === floor.id ? null : floor.id)
            }
            className="w-full text-left font-semibold text-lg bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
          >
            Planta: {floor.name}
          </button>

          {expandedFloor === floor.id && (
            <div className="mt-2 space-y-2 px-4">
              {floor.zones.map((zone) => (
                <div key={zone.id}>
                  <button
                    onClick={() =>
                      setExpandedZone(expandedZone === zone.id ? null : zone.id)
                    }
                    className="w-full text-left font-medium bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded"
                  >
                    Zona: {zone.name}
                  </button>

                  {expandedZone === zone.id && (
                    <div className="grid grid-cols-4 gap-3 p-2">
                      {zone.parking_spots.map((spot) => (
                        <button
                          key={spot.id}
                          onClick={() => onSpotSelect?.(spot)}
                          disabled={spot.is_occupied}
                          className={`p-2 rounded flex flex-col items-center justify-center text-sm ${
                            spot.is_occupied
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          <Car className="h-5 w-5 mb-1" />
                          <span>{spot.spot_number}</span>
                          <span className="text-xs mt-1">
                            {spot.is_occupied ? 'Ocupado' : 'Libre'}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
