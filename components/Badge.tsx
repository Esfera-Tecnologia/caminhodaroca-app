import { globalStyles } from "@/styles/global";
import { ReactNode } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type BadgeProps = {
  text: string;
  icon?: ReactNode;
  style?: ViewStyle;
}

export default function Badge({icon, text, style}: BadgeProps)
{
  return (
    <View style={[styles.view, globalStyles.row, globalStyles.itemsCenter, style]}>
      {icon && (
        <View style={styles.icon}>
          {icon}
        </View>
      )}
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexShrink: 1,
    backgroundColor: "#e9f5f1",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  text: {
    fontSize: 12,
    fontWeight: 400,
    color: "#007f74"
  },
  icon: {
    width: 20,
  }
})