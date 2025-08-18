import { PropsWithChildren } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

interface CardHeaderProps extends PropsWithChildren {
  style?: ViewStyle;
  title?: string;
  titleStyle?: TextStyle;
}

export function CardHeader({
  style,
  title,
  titleStyle,
  children,
}: CardHeaderProps) {
  return (
    <View style={[styles.cardHeader, style]}>
      {title ? (
        <Text style={[styles.cardHeaderText, titleStyle]}>{title}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
    backgroundColor: "#f8f9fa",
  },
  cardHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
  },
});
