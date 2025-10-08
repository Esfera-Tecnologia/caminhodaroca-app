import { theme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Input, { InputProps } from "./Input";

interface PasswordProps extends InputProps {
  placeholder?: string;
  autoComplete?: "current-password" | "new-password";
}

export default function Password({placeholder, autoComplete, ...props}: PasswordProps)  {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Input
        placeholder={placeholder || "Digite sua senha"}
        secureTextEntry={!showPassword}
        autoComplete={autoComplete || "current-password"}
        {...props}
      />
      <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.button}>
        <Feather name={showPassword ? "eye-off" : "eye"} size={24} color={theme.colors.primary} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  button: {
    position: "absolute",
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
})