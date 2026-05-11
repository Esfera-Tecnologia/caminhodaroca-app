import env from "@/config.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

export type CalendarStatsType = {
  date: string;
  count: number;
  single_event_id?: number | null;
};

export function useCalendarStats(month?: number, year?: number) {
  const [stats, setStats] = useState<CalendarStatsType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const now = new Date();
        const queryMonth = month ?? now.getMonth() + 1;
        const queryYear = year ?? now.getFullYear();

        const response = await axios.get(`${env.API_URL}/events/calendar-stats`, {
          params: {
            month: queryMonth,
            year: queryYear,
          },
          signal: controller.signal,
        });

        setStats(response.data || []);
      } catch (error: unknown) {
        if (axios.isCancel(error) || (error as any)?.name === 'CanceledError' || (error as any)?.code === 'ERR_CANCELED') {
          return;
        }

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setStats([]);
        } else {
          Toast.error('Não foi possível carregar o calendário de eventos');
          console.error('Erro ao buscar calendário:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [month, year]);

  return { stats, loading };
}
