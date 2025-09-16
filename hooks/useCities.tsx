// hooks/useCities.ts
import env from "@/config.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

type CityOption = {
  value: number;
  label: string;
};

export function useCities(uf?: string | null, withLabelAsValue = false) {
  const [cities, setCities] = useState<CityOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCities() {
      setLoading(true);
      try {
        const response = await axios.get(`${env.API_URL}/cities`, {
          params: uf ? { uf } : {},
        });
        const data = response.data.map((city: any) => {
          city.value = withLabelAsValue ? city.label : city.value;
          city.label = city.label;
          return city;
        });
        setCities(data);
      } catch (error) {
        console.log(error);
        Toast.error("Não foi possível obter a lista de cidades no momento");
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
  }, [uf]);

  return { cities, loading };
}
