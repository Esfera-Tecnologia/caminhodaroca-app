import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import EntryScreen from "./entry";
import FirstScreen from "./first";

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const value = await AsyncStorage.getItem('@alreadyLaunched');
      if (value === null) {
        // Primeira vez
        setFirstLaunch(true);
      } else {
        // Já abriu antes
        setFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  if(firstLaunch === null) return;

  return (
    firstLaunch === true ? <FirstScreen /> : <EntryScreen />
  );
}