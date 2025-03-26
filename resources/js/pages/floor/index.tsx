import { useFloors } from "@/hooks/floor/useFloor"; // Usa la ruta correcta aquí
import { FloorLayout } from "@/layouts/floor/FloorLayout";
import { useTranslations } from "@/hooks/use-translations";

interface FloorProps {
  floors: {
    id: number;
    floor_number: string;
    capacity: number;

  }[];
}

export default function Index({ floors }: FloorProps) {
  const { t } = useTranslations();


  

  return (
    <FloorLayout title={t('ui.users.create')}>
        <div>
        {floors.map(floor => (
    <div key={floor.id} className="floor-item">
      <p>{t('ui.floor.number')}: {floor.floor_number}</p>
      <p>{t('ui.floor.capacity')}: {floor.capacity}</p>
    </div>
 
    ))}
      </div>
    </FloorLayout>
  );
}
