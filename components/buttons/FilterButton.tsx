import { theme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

export default function FilterButton(props: TouchableOpacityProps)
{
  return (
    <TouchableOpacity style={styles.filters} {...props}>
      <Ionicons name="options-outline" size={22} color="#00796B" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  filters: {
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 8,
    width: 40,
    height: 40,
    borderRadius:20,
    borderWidth: 1,
    borderColor: theme.colors.primary
  },
})