import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "../../lib/axios";

// Interfaz para los datos del piso
export interface Floor {
  id: string;
  floor_number: number;
  capacity: number;
  created_at: string;
}

// Interfaz para la respuesta de la API con paginación
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

// Interfaz para la respuesta esperada en el componente de tabla
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

interface UseFloorsParams {
  search?: string;
  page?: number;
  perPage?: number;
}

// Hook para obtener los pisos
export function useFloors({ search, page = 1, perPage = 10 }: UseFloorsParams = {}) {
  return useQuery({
    queryKey: ["floors", { search, page, perPage }],
    queryFn: async () => {
      const { data: apiResponse } = await axios.get<ApiPaginatedResponse<Floor>>("/api/floors", {
        params: {
          search,
          page,
          per_page: perPage,
        },
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      // Transformamos la respuesta de la API al formato esperado
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
      } as PaginatedResponse<Floor>;
    },
    // Puedes agregar opciones como `onError`, `onSuccess`, etc., si lo necesitas
  });
}

// Hook para crear un nuevo piso
export function useCreateFloor() {
  return useMutation({
    mutationFn: async (data: { floor_number: number; capacity: number }) => {
      const response = await axios.post("/api/floors", data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      return response.data;
    },
  });
}

// Hook para actualizar un piso existente
export function useUpdateFloor(floorId: string) {
  return useMutation({
    mutationFn: async (data: { floor_number: number; capacity: number }) => {
      const response = await axios.put(`/api/floors/${floorId}`, data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      return response.data;
    },
  });
}

// Hook para eliminar un piso
export function useDeleteFloor() {
  return useMutation({
    mutationFn: async (floorId: string) => {
      await axios.delete(`/api/floors/${floorId}`, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
    },
  });
}
