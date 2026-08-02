import env from "@/config.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

export type PartnerCategoryOption = {
  value: number;
  label: string;
  experiencias_oferecidas: boolean;
};

export function usePartnerCategories() {
  const [categories, setCategories] = useState<PartnerCategoryOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get<PartnerCategoryOption[]>(
          `${env.API_URL}/partner-categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.log(error);
        Toast.error("Não foi possível obter a lista de categorias de parceiros no momento");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading };
}
