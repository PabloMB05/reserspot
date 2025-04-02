import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";

// Updated Bookcase type to match the database schema
export interface Bookcase {
  id: string; // UUID
  number: number;
  capacity: number;
  zone_number: number; // UUID reference to zones table
  created_at: string;
  updated_at: string;
}

// Interface representing the actual API response structure
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

interface UseBookcasesParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export function useBookcases({ search, page = 1, perPage = 10 }: UseBookcasesParams = {}) {
  return useQuery({
    queryKey: ["bookcases", { search, page, perPage }],
    queryFn: async () => {
      const { data: apiResponse } = await axios.get<ApiPaginatedResponse<Bookcase>>("/api/bookcases", {
        params: {
          search,
          page,
          per_page: perPage,
        },
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
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
      } as PaginatedResponse<Bookcase>;
    },
  });
}

export function useCreateBookcase() {
  return useMutation({
    mutationFn: async (data: { number: number; capacity: number; zone_id: string }) => {
      const response = await axios.post("/api/bookcases", data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      });
      return response.data;
    },
  });
}

export function useUpdateBookcase(bookcaseId: string) {
  return useMutation({
    mutationFn: async (data: { number: number; capacity: number; zone_id: string }) => {
      const response = await axios.put(`/api/bookcases/${bookcaseId}`, data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      });
      return response.data;
    },
  });
}

export function useDeleteBookcase() {
  return useMutation({
    mutationFn: async (bookcaseId: string) => {
      await axios.delete(`/api/bookcases/${bookcaseId}`, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      });
    },
  });
}