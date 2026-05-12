import env from "@/config.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

export type EventDetailType = {
  id: number;
  name: string;
  description?: string;
  full_description?: string;
  organization?: string;
  start_date?: string | null;
  end_date?: string | null;
  image_url?: string;
  url?: string;
  location?: string;
  is_highlight?: boolean;
  expired?: boolean;
  properties?: Array<{ id: number; name: string }>;
};

export function useEventDetail(id?: string | number | null) {
  const [data, setData] = useState<EventDetailType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${env.API_URL}/events/${id}`, {
          signal: controller.signal,
        });
        // Laravel Resource wraps in { data: ... }
        setData(response.data.data ?? response.data);
      } catch (error: unknown) {
        if (
          axios.isCancel(error) ||
          (error as any)?.name === 'CanceledError' ||
          (error as any)?.code === 'ERR_CANCELED'
        ) {
          return;
        }
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setData(null);
        } else {
          Toast.error('Não foi possível carregar o evento');
          console.error('Erro ao buscar evento:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [id]);

  return { data, loading };
}
