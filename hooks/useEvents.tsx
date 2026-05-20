import env from "@/config.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

export type HomeEventType = {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  location?: string;
  start_date?: string | null;
  end_date?: string | null;
  expired?: boolean | null;
  url?: string;
};

export type EventFilterType = 'upcoming' | 'expired';

type UseEventsOptions = {
  filter?: EventFilterType;
  search?: string;
  is_highlight?: boolean;
  date?: string;
  enabled?: boolean;
};

export function useEvents(options?: UseEventsOptions) {
  const [data, setData] = useState<HomeEventType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // impede a busca
    if (options?.enabled === false) {
      setData([]);
      return;
    }
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const params: Record<string, string | boolean> = {};
        if (options?.filter) {
          params.filter = options.filter;
        }
        if (options?.search) {
          params.search = options.search;
        }
        if (options?.is_highlight) {
          params.is_highlight = true;
        }
        if (options?.date) {
          params.date = options.date;
        }
        const response = await axios.get(`${env.API_URL}/events`, {
          params,
          paramsSerializer: (params) => {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                value.forEach((v) => searchParams.append(`${key}[]`, String(v)));
              } else if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
              }
            });
            return searchParams.toString();
          },
          signal: controller.signal,
        });
        setData(response.data.data || []);
      } catch (error: unknown) {
        if (axios.isCancel(error) || (error as any)?.name === 'CanceledError' || (error as any)?.code === 'ERR_CANCELED') {
          return;
        }
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setData([]);
        } else {
          Toast.error('Não foi possível carregar eventos no momento');
          console.error('Erro ao buscar eventos:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [
    options?.filter,
    options?.search,
    options?.is_highlight,
    options?.date,
    options?.enabled,
  ]);

  return { data, loading };
}