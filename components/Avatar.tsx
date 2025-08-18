import { theme } from "@/theme";
import { Image } from "expo-image";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

const avatar = require('@/assets/images/avatar.jpg');

type AvatarProps = {
  style?: StyleProp<ViewStyle>
}
export default function Avatar({style}: AvatarProps) {
  return (
    <View style={[styles.container, style]}>
      <Image source={avatar} style={styles.avatar} />
      <Text style={styles.name}>João da Silva</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 700,
    color: theme.colors.body,
  },
})
