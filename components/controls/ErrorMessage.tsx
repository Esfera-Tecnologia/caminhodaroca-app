import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <Text style={styles.error}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  error: {
    color: "#ff0000",
    marginTop: 5,
    fontSize: 12,
  },
});