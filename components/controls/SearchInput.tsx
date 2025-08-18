import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchInput() {
  return (
    <View style={[globalStyles.shadowSm, styles.searchContainer]}>
      <Ionicons name="search" size={20} color={theme.colors.secondary} style={{paddingStart: 12}} />
      <TextInput placeholder="Buscar por palavra-chave..." placeholderTextColor={"#BCBCBD"} style={styles.searchInput} />
    </View>
  )
}


const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    lineHeight: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
