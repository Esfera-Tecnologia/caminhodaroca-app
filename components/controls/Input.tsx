import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  shouldApplyDefaultStyle?: boolean;
}

export default function Input({
  style,
  placeholderTextColor = "#BCBCBD",
  onChangeText,
  ...props
}: InputProps) {
  const [wasFilled, setWasFilled] = useState(
    props.value != "" && props.value != undefined && props.value != null
  );
  const [isFocused, setIsFocused] = useState(false);

  function handleChangeText(text: string, onChangeText?: (text: string) => void) {
    setWasFilled(text != "");
    if (onChangeText) onChangeText(text);
  }

  return (
    <View style={[styles.container, isFocused && styles.focused]}>
      <TextInput
        {...props}
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => handleChangeText(text, onChangeText)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          wasFilled && styles.filled,
          props.readOnly && styles.disabled,
          style,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#dee2e6",
    overflow: "visible",
  },
  input: {
    backgroundColor: "#fff",
    height: 40,
    paddingHorizontal: 12,
    fontSize: 16,
    borderRadius: 6,
  },
  filled: {
    borderColor: "#008FDB",
  },
  focused: {
    borderColor: "#86b7fe",
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadDistance: 4,
        color: "rgba(13,110,253,0.25)",
      },
    ],
  },
  disabled: {
    backgroundColor: "#E3E4E6",
    borderColor: "#CDD1D6",
    color: "#636C79",
    fontFamily: "Roboto_400Regular",
  },
});
