import { Pressable, PressableProps, StyleSheet, Text, ViewStyle } from "react-native";

interface CancelButtonProps extends PressableProps {
  label?: string;
  style?: ViewStyle;
}

export default function CancelButton({label, style, ...props}: CancelButtonProps) {
  return (
    <Pressable style={[styles.button, style]} {...props}>
      <Text style={styles.text}>{label || "Cancelar"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
  },
  text: {
    fontFamily: "Roboto_500Medium",
    fontSize: 14,
    color: "#686868",
    textAlign: "center",
  },
});
