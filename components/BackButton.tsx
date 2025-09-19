import { FontAwesome6 } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface BackButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  backRoute?: Href;
}
export default function BackButton({style, backRoute, ...props}: BackButtonProps) {
  return (
    <Pressable style={[style, styles.button]} onPress={() => backRoute ? router.dismissTo(backRoute) : router.back()} {...props}>
      <FontAwesome6 name="arrow-left-long" size={16} color="#fff" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
})
