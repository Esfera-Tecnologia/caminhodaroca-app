import { Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

interface PrimaryButtonProps extends PressableProps {
  label?: string;
  style?: StyleProp<ViewStyle>
}
export default function PrimaryButton({label, children, style, ...props}: PrimaryButtonProps) {
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
    backgroundColor: "#198754", // verde
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  pressed: {
    backgroundColor: "#62B55A"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
})