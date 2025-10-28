import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from 'toastify-react-native';

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <Slot />
          <ToastManager useModal={false} />
        </AuthProvider>
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}