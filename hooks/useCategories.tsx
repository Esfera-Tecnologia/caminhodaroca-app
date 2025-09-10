// hooks/useStates.ts
import env from "@/config.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

type CategoryOption = {
  value: number;
  label: string;
};

export function useCategories() {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${env.API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
        Toast.error('Não foi possível obter a lista de categorias no momento');
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return { categories, loading };
}
