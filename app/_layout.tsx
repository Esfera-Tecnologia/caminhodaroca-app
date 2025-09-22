import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import ToastManager from 'toastify-react-native';

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <AuthProvider>
        <Slot />
        <ToastManager useModal={false} />
      </AuthProvider>
    </KeyboardProvider>
  );
}