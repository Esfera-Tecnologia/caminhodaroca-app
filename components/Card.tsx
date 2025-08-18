import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface CardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>
}
export default function Card({style, children}: CardProps) {
  return (
    <View style={[styles.card, style]}>
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
