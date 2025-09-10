// hooks/useStates.ts
import env from "@/config.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

type StateOption = {
  value: string;
  label: string;
};

export function useStates() {
  const [states, setStates] = useState<StateOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await axios.get(`${env.API_URL}/states`);
        setStates(response.data);
      } catch {
        Toast.error('Não foi possível obter a lista de estados no momento');
      } finally {
        setLoading(false);
      }
    }
    fetchStates();
  }, []);

  return { states, loading };
}
