import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

type HelperTextProps = {
  text?: string;
  children?: ReactNode;
}
export default function HelperText({text, children}: HelperTextProps) {
  return (
    <Text style={styles.text}>{text || children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 4,
  }
})