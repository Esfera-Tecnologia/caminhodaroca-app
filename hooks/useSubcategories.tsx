// hooks/useSubcategories.ts
import env from "@/config.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

type SubcategoryOption = {
  value: number;
  label: string;
};

export function useSubcategories(categoryId: number | null) {
  const [subcategories, setSubcategories] = useState<SubcategoryOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (! categoryId) return; // evita chamada se não houver categoria selecionada

    async function fetchSubcategories() {
      setLoading(true);
      try {
        const response = await axios.get(`${env.API_URL}/categories/${categoryId}/subcategories`);
        setSubcategories(response.data);
      } catch (error) {
        console.log(error);
        Toast.error('Não foi possível obter a lista de subcategorias no momento');
      } finally {
        setLoading(false);
      }
    }

    fetchSubcategories();
  }, [categoryId]);

  return { subcategories, loading };
}
