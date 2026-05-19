import env from "@/config.json";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export interface FavoriteList {
  id: number;
  name: string;
  is_default: boolean;
  properties_count: number;
}

type FavoriteListsSubscriber = () => void;
const favoriteListsSubscribers = new Set<FavoriteListsSubscriber>();

export function refetchFavoriteLists() {
  favoriteListsSubscribers.forEach((subscriber) => subscriber());
}

export function useFavoriteLists() {
  const [lists, setLists] = useState<FavoriteList[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchLists = useCallback(async () => {
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
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    const subscriber = async () => {
      if (!isMounted) return;
      await fetchLists();
    };

    favoriteListsSubscribers.add(subscriber);
    fetchLists();

    return () => {
      isMounted = false;
      favoriteListsSubscribers.delete(subscriber);
    };
  }, [fetchLists]);

  return { lists, loading, refetch: fetchLists };
}
