// hooks/useSubcategories.ts
import env from "@/config.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

type SubcategoryOption = {
  value: number;
  label: string;
};

export function useSubcategories(categoryIds: number[] | undefined) {
  const [subcategories, setSubcategories] = useState<SubcategoryOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubcategories() {
      setLoading(true);
      try {
        if (!categoryIds || categoryIds.length === 0) {
          setSubcategories([]);
          return;
        };
        const params = new URLSearchParams();
        categoryIds.forEach((id) => params.append("categories[]", id.toString()));

        const response = await axios.get(
          `${env.API_URL}/subcategories?${params.toString()}`
        );
        setSubcategories(response.data);
      } catch (error) {
        console.log(error);
        Toast.error("Não foi possível obter a lista de subcategorias no momento");
      } finally {
        setLoading(false);
      }
    }

    fetchSubcategories();
  }, [categoryIds]);

  return { subcategories, loading };
}
