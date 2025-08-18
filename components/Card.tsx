import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export default function Card({children}: PropsWithChildren) {
  return (
    <View style={styles.card}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 24,
    minWidth: 0,
    width: '100%',
  }
})
