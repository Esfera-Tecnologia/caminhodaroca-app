import * as Location from 'expo-location';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserLocationType = {
  latitude: number;
  longitude: number;
} | null;

type LocationContextType = {
  location: UserLocationType;
  loading: boolean;
};

const LocationContext = createContext<LocationContextType>({
  location: null,
  loading: true, // começa carregando
});

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<UserLocationType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        let loc = await Location.getLastKnownPositionAsync({});
        if (!loc) {
          loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Lowest,
          });
        }
        if (loc) {
          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
      } catch (e) {
        console.warn("Erro ao obter localização:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <LocationContext.Provider value={{location, loading}}>
      {children}
    </LocationContext.Provider>
  );
};

export const useUserLocation = () => useContext(LocationContext);
