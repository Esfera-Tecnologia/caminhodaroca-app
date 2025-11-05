import { StyleSheet, View } from "react-native";

export default function HorizontalLine()
{
  return (
    <View style={styles.line} />
  )
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e6f0ed",
    marginVertical: 32,
  }
})