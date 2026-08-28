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
  const categoryIdsKey = categoryIds?.map(Number).filter(Boolean).join(",") ?? "";

  useEffect(() => {
    let active = true;

    async function fetchSubcategories() {
      setLoading(true);
      try {
        const ids = categoryIdsKey.split(",").filter(Boolean).map(Number);

        if (ids.length === 0) {
          if (active) setSubcategories([]);
          return;
        };
        const params = new URLSearchParams();
        ids.forEach((id) => params.append("categories[]", id.toString()));

        const response = await axios.get(
          `${env.API_URL}/subcategories?${params.toString()}`
        );
        if (active) setSubcategories(response.data);
      } catch (error) {
        console.log(error);
        if (active) Toast.error("Não foi possível obter a lista de subcategorias no momento");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchSubcategories();
    return () => {
      active = false;
    };
  }, [categoryIdsKey]);

  return { subcategories, loading };
}
