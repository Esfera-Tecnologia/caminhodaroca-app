import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface SearchInputProps extends TextInputProps {
  onSearch: (search: string) => void;
};

export default function SearchInput({ onSearch, ...props }: SearchInputProps) {
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
    <View style={[styles.searchContainer]}>
      <Ionicons
        name="search"
        size={20}
        color={'#8fb5af'}
        style={{ paddingStart: 14 }}
      />
      <TextInput
        placeholderTextColor="#BCBCBD"
        style={styles.searchInput}
        onChangeText={handleChange}
        {...props}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 30,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 12,
        spreadDistance: 0,
        color: "rgba(0,0,0,0.08)"
      },
    ],
  },
  searchInput: {
    color: "#212529",
    flex: 1,
    height: 40,
    fontSize: 15,
    paddingEnd: 14,
    paddingStart: 10,
    textAlignVertical: "center",
  },
});
