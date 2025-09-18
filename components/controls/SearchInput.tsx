import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type SearchInputProps = {
  onSearch: (search: string) => void;
};

export default function SearchInput({ onSearch }: SearchInputProps) {
  const debounceTimeout = useRef<number | null>(null);

  const handleChange = (text: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      onSearch(text);
    }, 500) as unknown as number; // força TypeScript aceitar
  };

  return (
    <View style={[globalStyles.shadowSm, styles.searchContainer]}>
      <Ionicons
        name="search"
        size={20}
        color={theme.colors.secondary}
        style={{ paddingStart: 12 }}
      />
      <TextInput
        placeholder="Buscar por palavra-chave..."
        placeholderTextColor="#BCBCBD"
        style={styles.searchInput}
        onChangeText={handleChange}
      />
    </View>
  );
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
    color: "#000",
    flex: 1,
    fontSize: 14,
    lineHeight: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
