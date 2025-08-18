import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface BackButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>
}
export default function BackButton({style, ...props}: BackButtonProps) {
  return (
    <Pressable style={[style, styles.button]} onPress={() => router.back()} {...props}>
      <FontAwesome6 name="arrow-left-long" size={16} color="#fff" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
})
