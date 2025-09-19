import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import ToastManager from 'toastify-react-native';

export default function RootLayout() {
  return (
    <AuthProvider>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <Slot />
      </KeyboardAvoidingView>
      <ToastManager useModal={false} />
    </AuthProvider>
  );
}