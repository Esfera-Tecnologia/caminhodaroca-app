import env from "@/config.json";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

export interface FavoriteList {
  id: number;
  name: string;
  is_default: boolean;
  properties_count: number;
}

export function useFavoriteLists() {
  const [lists, setLists] = useState<FavoriteList[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLists = async () => {
      if (!user) {
        setLists([]);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(`${env.API_URL}/favorite-lists`);
        const listsData = response.data.data || response.data;
        setLists(listsData);
      } catch (error) {
        console.log('Erro ao buscar listas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, [user]);

  return { lists, loading };
}
