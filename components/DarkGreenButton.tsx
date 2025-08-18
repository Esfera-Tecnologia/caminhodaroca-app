import { theme } from "@/theme";
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

interface DarkGreenButtonProps extends PressableProps {
  label?: string;
  style?: StyleProp<ViewStyle>
}
export default function DarkGreenButton({label, children, style, ...props}: DarkGreenButtonProps) {
  return (
    <Pressable style={({pressed}) => [style, styles.button, pressed && styles.pressed]} {...props}>
      {label ? (
        <Text style={styles.buttonText}>{label}</Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary, // verde
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  pressed: {
    backgroundColor: "#62B55A"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})