import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface LinkButtonProps extends PressableProps {
  label?: string;
}
export default function LinkButton({label, children, ...props}: LinkButtonProps) {
  return (
    <Pressable {...props}>
      {label ? (
        <Text style={styles.text}>{label}</Text>
      ) : (
        children
      )}
    </Pressable>
  )
}
const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});