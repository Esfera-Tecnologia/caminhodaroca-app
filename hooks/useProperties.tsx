import env from "@/config.json";
import { PropertyFilters } from "@/modules/protected/HomeFilters";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

export type PropertyItemType = {
  id: number;
  name: string;
  logo: string;
  type: string;
  rating: number;
  location: {
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
};

export function useProperties(filters: PropertyFilters | undefined) {
  const [data, setData] = useState<PropertyItemType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${env.API_URL}/properties`, {
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
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setData([]);
          } else {
            Toast.error('Não foi possível obter a lista de propriedades no momento');
          }
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
