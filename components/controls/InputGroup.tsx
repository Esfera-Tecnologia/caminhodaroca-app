import React, { PropsWithChildren } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import ErrorMessage from "./ErrorMessage";

type InputGroupProps = PropsWithChildren<{
  label?: string;
  labelStyle?: TextStyle;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  style?: ViewStyle | ViewStyle[];
  margin?: number;
}>;

function getErrorMessage(error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>): string | undefined {
  return error?.message as string | undefined;
}

export default function InputGroup({
  label,
  labelStyle,
  margin = 16,
  style,
  children,
  error,
}: InputGroupProps) {
  const message = getErrorMessage(error);
  return (
    <View style={[styles.container, { marginBottom: margin }, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      {children}
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: "#212529",
  },
  icon: {
    marginRight: 10,
  },
});
