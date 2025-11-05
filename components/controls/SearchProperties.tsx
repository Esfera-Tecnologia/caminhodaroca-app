import { useAutocompleteProperties } from "@/hooks/useAutocompleteProperties";
import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AutocompleteInput from "react-native-autocomplete-input";

type SearchPropertiesProps = {
  onSearch: (search: string) => void;
};

export default function SearchProperties({ onSearch }: SearchPropertiesProps) {
  const debounceTimeout = useRef<number | null>(null);
  const [ query, setQuery ] = useState('');
  const [ hideResults, setHideResults ] = useState(false);
  const { options } = useAutocompleteProperties(query);

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
      <View style={styles.autocompleteContainer}>
        <Ionicons
          name="search"
          size={20}
          color={theme.colors.secondary}
          style={styles.searchIcon}
        />
        <AutocompleteInput
          hideResults={hideResults || options.length === 1 && options[0].label === query}
          placeholder="Buscar por palavra-chave..."
          placeholderTextColor="#BCBCBD"
          onBlur={() => setHideResults(true)}
          onFocus={() => setHideResults(false)}
          autoCorrect={false}
          data={options}
          inputContainerStyle={styles.searchInputContainer}
          style={styles.searchInput}
          value={query}
          onChangeText={(text) => {
            setQuery(text)
            handleChange(text);
          }}
          flatListProps={{
            keyboardShouldPersistTaps: 'always',
            style: [styles.listStyle, globalStyles.shadowSm],
            keyExtractor: (item) => `P_${item.value}`,
            renderItem: ({item}) => (
              <TouchableOpacity onPress={() => {
                setQuery(item.label)
                handleChange(item.label)
              }}>
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 10,
    zIndex: 2,
  },
  searchInputContainer: {
    borderWidth: 0,
  },
  searchInput: {
    color: "#000",
    flex: 1,
    fontSize: 14,
    paddingVertical: 6,
    paddingEnd: 12,
    paddingStart: 40,
    textAlignVertical: "center",
    borderRadius: 6,
  },
  listStyle: {
    maxHeight: 150,
    width: '100%',
    borderTopWidth: 1,
    margin: 0,
    marginTop: 5,
    borderColor: '#f2f2f2',
    borderRadius: 6,
  },
  itemText: {
    fontSize: 14,
    margin: 3,
  },
});
