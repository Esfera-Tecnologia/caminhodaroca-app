import { ActivityIndicator, Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

interface PrimaryButtonProps extends PressableProps {
  label?: string;
  style?: StyleProp<ViewStyle>
  loading?: boolean;
}
export default function PrimaryButton({label, children, style, loading = false, ...props}: PrimaryButtonProps) {
  return (
    <Pressable style={({pressed}) => [style, styles.button, pressed && styles.pressed]} disabled={loading} {...props}>
      <>
        {loading && <ActivityIndicator size="small" color="#fff" style={{marginEnd: 6}} />}
        {label ? (
          <Text style={styles.buttonText}>{label}</Text>
        ) : (
          children
        )}
      </>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#198754", // verde
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: "#62B55A"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
})