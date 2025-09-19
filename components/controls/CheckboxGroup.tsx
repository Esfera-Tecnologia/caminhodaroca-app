import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";
import StyledCheckbox, { StyledCheckboxProps } from "./StyledCheckbox";

interface CheckboxGroupProps extends StyledCheckboxProps {
    label: string,
    margin?: number,
}
export default function CheckboxGroup({label, size = 'md', margin = 0,  ...props}: CheckboxGroupProps) {
  return (
    <View style={[globalStyles.row, globalStyles.itemsCenter, {marginBottom: margin}]}>
      <StyledCheckbox size={size} style={{ marginEnd: 8 }} {...props} />
      <Text style={[globalStyles.textBase, {flexShrink: 1}]}>
        {label}
      </Text>
    </View>
  );
}
