import { Image, ImageProps } from "expo-image";
import { StyleSheet } from "react-native";

export default function Logo(props: ImageProps) {
  return (
    <Image {...props} style={[props.style, styles.logo]} contentFit='cover'/>
  )
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 16,
    width: 76,
    height: 76,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    marginEnd: 12,
    marginTop: 6
  },
})