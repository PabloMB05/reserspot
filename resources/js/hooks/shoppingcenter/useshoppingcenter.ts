import { useQuery } from '@tanstack/react-query';
import axios from '../../lib/axios';

// Tipos de respuesta para la API
export interface OpeningHour {
  day_of_week: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

export interface ShoppingCenter {
  id: string;
  name: string;
  location: string;
  description?: string;
  is_open?: boolean;
  opening_hours?: OpeningHour[];
}

// Interface para la respuesta paginada
export interface ApiPaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Tipado para la respuesta paginada
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

// Hook de consulta de centros comerciales
export function useShoppingCenters() {
  return useQuery<PaginatedResponse<ShoppingCenter>, Error>({
    queryKey: ['shopping-centers'],
    queryFn: async () => {
      try {
        // Realizamos la solicitud HTTP
        const { data: apiResponse } = await axios.get<ApiPaginatedResponse<ShoppingCenter>>('/api/shopping-centers', {
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });

        // Devolvemos los datos transformados
        return {
          data: apiResponse.data,
          meta: {
            current_page: apiResponse.current_page,
            from: apiResponse.from,
            last_page: apiResponse.last_page,
            per_page: apiResponse.per_page,
            to: apiResponse.to,
            total: apiResponse.total,
          },
        };
      } catch (error) {
        // Manejo básico de errores
        throw new Error('Error al obtener los centros comerciales');
      }
    },
  });
}
