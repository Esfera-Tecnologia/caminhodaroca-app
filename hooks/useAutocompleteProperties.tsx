// hooks/useAutocompleteProperties.ts
import env from "@/config.json";
import axios from "axios";
import { useEffect, useState } from "react";

type AutocompleteOption = {
  value: number;
  label: string;
};

export function useAutocompleteProperties(query: string) {
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setOptions([]);
      return;
    }
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${env.API_URL}/properties/autocomplete`, {
          params: { keyword: query },
        });
        setOptions(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { options, loading };
}
