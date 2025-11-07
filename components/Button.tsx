import { theme } from "@/theme";
import React from "react";
import { ActivityIndicator, Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

interface ButtonProps extends PressableProps {
  title?: string;
  variant?: "primary" | "secondary" | "danger" | "warning" | "success" | "instagram" | "disabled";
  outline?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg'
};

export default function Button({
  title,
  variant = "primary",
  outline = false,
  onPress,
  style,
  textStyle,
  startIcon,
  endIcon,
  loading = false,
  size = 'md',
  ...props
}: ButtonProps) {
  const sizeStyle = styles[`size_${size}`];
  const sizeTextStyle = styles[`size_${size}_text`];
  const variantStyle = outline ? styles[`outline_${variant}`] : styles[variant];
  const variantTextStyle = outline
    ? [styles.text, styles[`outline_${variant}_text`]]
    : [styles.text];

  return (
    <Pressable
      disabled={loading}
      onPress={onPress}
      {...props}
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        sizeStyle,
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={styles.content}>
        {loading && <ActivityIndicator size="small" color="#fff" style={{marginEnd: 6}} />}
        {startIcon && <View style={[styles.icon, title ? {marginEnd: 8} : {}]}>{startIcon}</View>}
        {title && <Text numberOfLines={1} style={[variantTextStyle, sizeTextStyle, textStyle, variant === 'disabled' ? {color: '#888'} : {}]}>{title}</Text>}
        {endIcon && <View style={styles.icon}>{endIcon}</View>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderWidth: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    lineHeight: 24,
    color: "#fff",
    flexShrink: 1
  },
  // Solid variants
  primary: {
    backgroundColor: "#198754",
    borderColor: "#198754",
  },
  success: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  warning: {
    backgroundColor: theme.colors.warning,
    borderColor: theme.colors.warning,
  },
  secondary: {
    backgroundColor: "#6c757d",
    borderColor: "#6c757d",
  },
  danger: {
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
  },
  instagram: {
    backgroundColor: "#DD2A7B",
    borderColor: "#DD2A7B",
  },
  disabled: {
    backgroundColor: "#f2f2f2",
    borderColor: "#e7e7e7ff",
  },

  // Outline variants
  outline_primary: {
    backgroundColor: "transparent",
    borderColor: "#198754",
  },
  outline_primary_text: {
    color: "#198754",
  },
  outline_success: {
    backgroundColor: "transparent",
    borderColor: theme.colors.success,
  },
  outline_success_text: {
    color: theme.colors.success,
  },
  outline_secondary: {
    backgroundColor: "transparent",
    borderColor: "#6c757d",
  },
  outline_secondary_text: {
    color: "#6c757d",
  },
  outline_danger: {
    backgroundColor: "transparent",
    borderColor: theme.colors.danger,
  },
  outline_danger_text: {
    color: theme.colors.danger,
  },
  outline_warning: {
    backgroundColor: "transparent",
    borderColor: theme.colors.warning,
  },
  outline_warning_text: {
    color: theme.colors.warning,
  },
  outline_disabled: {
    backgroundColor: "transparent",
    borderColor: "#f2f2f2",
  },
  outline_disabled_text: {
    color: '#888',
  },
  outline_instagram: {
    backgroundColor: "transparent",
    borderColor: theme.colors.instagram,
  },
  outline_instagram_text: {
    color: theme.colors.instagram,
  },
  size_lg: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  size_md: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  size_sm: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  size_lg_text: {
    fontSize: 18,
    lineHeight: 28,
  },
  size_md_text: {
    fontSize: 16,
    lineHeight: 24,
  },
  size_sm_text: {
    fontSize: 13,
    lineHeight: 20,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.85,
  },
});
