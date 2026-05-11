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
  url?: string;
};

export function useEvents() {
  const [data, setData] = useState<HomeEventType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${env.API_URL}/events`, {
          params: { 
            filter: 'upcoming',
            is_highlight: true
          },
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
  }, []);

  return { data, loading };
}
