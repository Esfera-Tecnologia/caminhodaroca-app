import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager from 'toastify-react-native';

export default function RootLayout() {
  return (
    <AuthProvider>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Slot />
        </SafeAreaView>
      </KeyboardAvoidingView>
      <ToastManager useModal={false} />
    </AuthProvider>
  );
}