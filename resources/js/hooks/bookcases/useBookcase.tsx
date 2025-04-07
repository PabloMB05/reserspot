import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";

export interface Bookcase {
  id: string;
  number: number;
  capacity: number;
  zone_number: number;
  zone_genre: string;
  floor_number: number;
  created_at: string;
}


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
interface UseBookcaseParams {
  search?: any[];
  page?: number;
  perPage?: number;
}

export function useBookcases({ search, page = 1, perPage = 10 }: UseBookcaseParams = {}) {
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
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      // Transform the API response to the expected format
      return {
        data: apiResponse.data,
        meta: {
          current_page: apiResponse.current_page,
          from: apiResponse.from,
          last_page: apiResponse.last_page,
          per_page: apiResponse.per_page,
          to: apiResponse.to,
          total: apiResponse.total
        }
      } as PaginatedResponse<Bookcase>;
    },
  });
}

export function useCreateBookcase() {
  return useMutation({
    mutationFn: async (data: { title: string; genres: string; author: string ; length: number ; editor: string ; bookcasecase_id: string }) => {
      const response = await axios.post("/api/bookcases", data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response.data;
    },
  });
}

export function useUpdateBookcase(bookcaseId: string) {
  return useMutation({
    mutationFn: async (data: { title: string; genres: string; author: string ; length: number ; editor: string ; bookcasecase_id: string }) => {
      const response = await axios.put(`/api/bookcases/${bookcaseId}`, data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
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
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
    },
  });
}