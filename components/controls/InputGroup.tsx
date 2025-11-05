import React, { PropsWithChildren } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import ErrorMessage from "./ErrorMessage";

type InputGroupProps = PropsWithChildren<{
  label?: string;
  helper?: string;
  labelStyle?: TextStyle;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | string;
  style?: ViewStyle | ViewStyle[];
  margin?: number;
}>;

function getErrorMessage(
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | string
): string | undefined {
  if (!error) return undefined;
  if (typeof error === "string") return error;
  if ("message" in error) return error.message as string | undefined;
  return undefined;
}

export default function InputGroup({
  label,
  helper,
  labelStyle,
  margin = 16,
  style,
  children,
  error,
}: InputGroupProps) {
  const message = getErrorMessage(error);

  return (
    <View style={[styles.container, { marginBottom: margin }, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label} {helper && <Text style={styles.helper}>{helper}</Text>}</Text>}
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
  helper: {
    fontSize: 12,
    fontWeight: 500,
    color: '#6c757d',
    marginLeft: 4,
  },
  icon: {
    marginRight: 10,
  },
});
