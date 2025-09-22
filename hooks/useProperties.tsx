import env from "@/config.json";
import { useUserLocation } from "@/context/LocationContext";
import { PropertyFilters } from "@/modules/protected/HomeFilters";
import { getDistanceInKm } from "@/util";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

export type PropertyItemType = {
  id: number;
  name: string;
  logo: string;
  type: string;
  rating: number;
  distance: number | undefined;
  location: {
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
};

export function useProperties(filters: PropertyFilters | undefined) {
  const [data, setData] = useState<PropertyItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const {location: userLocation, loading: userLocationLoading} = useUserLocation();

  useEffect(() => {
    if (userLocationLoading) return;
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${env.API_URL}/properties`, {
          params: filters || {},
          paramsSerializer: (params) => {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                value.forEach((v) => searchParams.append(`${key}[]`, String(v)));
              } else if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
              }
            });
            return searchParams.toString();
          },
          signal: controller.signal,
        });
        let properties = response.data;
        if(userLocation) {
          properties = properties.map((p: PropertyItemType) => {
            const distance = getDistanceInKm(
              userLocation.latitude,
              userLocation.longitude,
              p.location.coordinates.lat,
              p.location.coordinates.lng
            );
            return { ...p, distance };
          })
          .sort((a: PropertyItemType, b: PropertyItemType) => {
            if(a.distance === undefined) return 1;
            if(b.distance === undefined) return -1;
            return a.distance - b.distance;
          });
          if (filters?.useCurrentLocation) {
            properties = properties
              .filter((p: PropertyItemType & { distance?: number }) => p.distance! <= 100);
          }
        }
        setData(properties);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setData([]);
          } else {
            Toast.error('Não foi possível obter a lista de propriedades no momento');
          }
        }
      } finally {
        setLoading(false);
      }
    };
    if (filters?.useCurrentLocation && !userLocation) {
      return;
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [filters, userLocation, userLocationLoading]);

  return { data, loading };
}
