import { useAuth } from "@/context/AuthContext";
import { Stack, router } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/home/property");
    }
  }, [user]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="second" />
      <Stack.Screen name="third" />
    </Stack>
  );
}
