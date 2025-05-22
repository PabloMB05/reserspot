import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

// Define tu modelo Store
export interface Store {
  id: string | number;
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  store_category?: {
    name: string;
  };
  floor?: number | string;
}

// Tipo de respuesta de la API
export interface ApiPaginatedResponse<T> {
  current_page: number;
  data: T[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

// Tipo adaptado para el componente Table
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

interface UseStoresParams {
  search?: string;
  page?: number;
  perPage?: number;
  category?: string;
  floor?: string;
}

export function useStores({ search, page = 1, perPage = 10, category, floor }: UseStoresParams = {}) {
  return useQuery({
    queryKey: ["stores", { search, page, perPage, category, floor }],
    queryFn: async () => {
      const { data: apiResponse } = await axios.get<ApiPaginatedResponse<Store>>("/api/stores", {
        params: {
          search,
          page,
          per_page: perPage,
          category,
          floor,
        },
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });

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
      } as PaginatedResponse<Store>;
    },
  });
}
export function useCreateStore() {
  return useMutation({
    mutationFn: async (data: Partial<Store>) => {
      const response = await axios.post("/api/stores", data, {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      return response.data;
    },
  });
}
export function useUpdateStore(storeId: string | number) {
  return useMutation({
    mutationFn: async (data: Partial<Store>) => {
      const response = await axios.put(`/api/stores/${storeId}`, data, {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      return response.data;
    },
  });
}
export function useDeleteStore() {
  return useMutation({
    mutationFn: async (storeId: string | number) => {
      await axios.delete(`/api/stores/${storeId}`, {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });
    },
  });
}
