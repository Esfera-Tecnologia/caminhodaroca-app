import { theme } from "@/theme";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

type ReviewProps = {
  length: number;
  review: number;
}
export default function Review({length, review}: ReviewProps) {
  return (
    <View style={styles.stars}>
      {Array.from({ length: length }).map((_, i) => (
        <FontAwesome
          key={i}
          name={i < review ? "star" : "star-o"}
          size={16}
          color={theme.colors.warning}
        />
      ))}
    </View>
  )
}


const styles = StyleSheet.create({
  stars: {
    flexDirection: "row",
    marginVertical: 4
  },
});
