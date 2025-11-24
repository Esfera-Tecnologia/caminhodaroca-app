import env from "@/config.json";
import { PartnerItemType } from "@/interfaces";
import { PartnerFilters } from "@/modules/protected/PartnerFilters";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

export function usePartners(filters: PartnerFilters | undefined) {
  const [data, setData] = useState<PartnerItemType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${env.API_URL}/partners`, {
          params: filters || {},
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
        setData(response.data);
      } catch (error: unknown) {
        if (axios.isCancel(error) || (error as any)?.name === 'CanceledError' || (error as any)?.code === 'ERR_CANCELED') {
          return;
        }
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setData([]);
          } else {
            Toast.error('Não foi possível obter a lista de propriedades no momento');
          }
        } else {
          console.error('Erro inesperado:', error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [filters]);

  return { data, loading };
}
