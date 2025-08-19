import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import ToastManager from 'toastify-react-native';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
      <ToastManager useModal={false} />
    </AuthProvider>
  );
}