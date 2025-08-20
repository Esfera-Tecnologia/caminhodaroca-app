import Checkbox, { CheckboxProps } from "expo-checkbox";
import { StyleSheet } from "react-native";

const sizes = {
  lg: {
    width: 24,
    height: 24,
  },
  md: {
    width: 16,
    height: 16,
  },
};
export interface StyledCheckboxProps extends CheckboxProps {
  size: "lg" | "md";
  style?: object;
}
export default function StyledCheckbox({
  size = "lg",
  style,
  ...props
}: StyledCheckboxProps) {
  return <Checkbox style={[styles.checkbox, sizes[size], style]} {...props} />;
}

const styles = StyleSheet.create({
  checkbox: {
    borderColor: "#dee2e6",
    borderWidth: 1,
    borderRadius: 4,
  },
});
