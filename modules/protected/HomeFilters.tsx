import Button from "@/components/Button";
import Input from "@/components/controls/Input";
import InputGroup from "@/components/controls/InputGroup";
import Select from "@/components/controls/Select";
import Offcanvas, { OffcanvasProps } from "@/components/Offcanvas";
import { useAuth } from "@/context/AuthContext";
import { useUserLocation } from "@/context/LocationContext";
import { useCategories } from "@/hooks/useCategories";
import { useCities } from "@/hooks/useCities";
import { useFavoriteLists } from "@/hooks/useFavoriteLists";
import { useAutocompleteProperties } from "@/hooks/useAutocompleteProperties";
import { useSubcategories } from "@/hooks/useSubcategories";
import { globalStyles } from "@/styles/global";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type PropertyFilters = {
  keyword?: string;
  categories?: number[];
  subcategories?: number[];
  propertyLocationId?: number; 
  useCurrentLocation?: boolean;
  favorite_list_id?: number;
};

interface HomeFiltersProps extends OffcanvasProps {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  onApply: (filters: PropertyFilters) => void;
}

export default function HomeFilters({
  keyword,
  onKeywordChange,
  onApply,
  onClose,
  isOpen,
  ...props
}: HomeFiltersProps) {
  const { user } = useAuth();
  const {location: userLocation} = useUserLocation();
  const [filters, setFilters] = useState<PropertyFilters>({
    categories: [],
    subcategories: [],
  });
  const [hideKeywordResults, setHideKeywordResults] = useState(false);

  const { categories } = useCategories();
  const { subcategories } = useSubcategories(filters.categories);
  const { cities } = useCities('RJ', true);
  const { lists } = useFavoriteLists();
  const { options: keywordOptions } = useAutocompleteProperties(keyword);

  const handleChange = (key: keyof PropertyFilters, value: any) => {
    const newFilters = {
      ...filters,
      keyword,
      [key]: value,
      ...(key === "useCurrentLocation" && value
        ? { propertyLocationId: undefined }
        : {}),
    };
    setFilters(newFilters);

    if (key === "keyword") {
      onKeywordChange(value);
    }

    const noFiltersApplied =
      !newFilters.keyword &&
      (!newFilters.categories || newFilters.categories.length === 0) &&
      (!newFilters.subcategories || newFilters.subcategories.length === 0) &&
      !newFilters.propertyLocationId &&
      !newFilters.useCurrentLocation &&
      !newFilters.favorite_list_id;

    if (isOpen && noFiltersApplied) {
      setTimeout(() => {
        onApply(newFilters);
        onClose();
      }, 500);
    }
  };

  const handleApply = () => {
    onApply({ ...filters, keyword });
    onClose();
  }

  return (
    <Offcanvas {...props} onClose={onClose} isOpen={isOpen}>
      <View>
        <InputGroup label="Localização Atual">
          <Select
            options={[
              { label: "Sim", value: true },
              { label: "Não", value: false },
            ]}
            disabled={!userLocation}
            selectedValue={filters.useCurrentLocation}
            onValueChange={(value) => {
              handleChange("useCurrentLocation", value === true || value === 'true')
            }
            }
          />
        </InputGroup>
        <InputGroup label="Localização da Propriedade">
          <Select
            disabled={filters.useCurrentLocation}
            options={cities}
            selectedValue={filters.propertyLocationId}
            onValueChange={(value) => handleChange("propertyLocationId", value)}
          />
        </InputGroup>
        <InputGroup label="Palavra-chave" style={{ zIndex: 2 }}>
          <View
            style={styles.keywordAutocomplete}
            onTouchStart={() => setHideKeywordResults(false)}
          >
            <Input
              placeholder="Ex: queijos, passeios..."
              value={keyword}
              autoCorrect={false}
              onEndEditing={() => setHideKeywordResults(true)}
              onChangeText={(text) => {
                setHideKeywordResults(false);
                handleChange("keyword", text);
              }}
            />
            {!hideKeywordResults &&
              keywordOptions.length > 0 &&
              !(keywordOptions.length === 1 &&
                keywordOptions[0].label === keyword) && (
                <FlatList
                  data={keywordOptions}
                  keyboardShouldPersistTaps="always"
                  style={[styles.keywordList, globalStyles.shadowSm]}
                  keyExtractor={(item) => `P_${item.value}`}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setHideKeywordResults(true);
                        handleChange("keyword", item.label);
                      }}
                    >
                      <Text style={styles.keywordItem}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}
          </View>
        </InputGroup>
        <InputGroup label="Categoria">
          <Select
            isMultiple
            options={categories}
            selectedValue={filters.categories}
            onValueChange={(values) =>
              handleChange("categories", Array.isArray(values) ? values?.map(Number) : [Number(values)])
            } />
        </InputGroup>
        <InputGroup label="Subcategoria">
          <Select
            isMultiple
            emptyListMessage="Selecione ao menos uma categoria para continuar"
            options={subcategories}
            selectedValue={filters.subcategories}
            onValueChange={(values) =>
              handleChange("subcategories", Array.isArray(values) ? values?.map(Number) : [Number(values)])
            } />
        </InputGroup>
        <InputGroup label="Lista de Favoritos">
          <Select
            options={user ? [
              { label: "Todos", value: 'all' },
              ...lists.map(list => ({ label: list.name, value: String(list.id) }))
            ] : []}
            emptyListMessage="Faça login para filtrar por favoritos"
            selectedValue={filters.favorite_list_id ? String(filters.favorite_list_id) : 'all'}
            onValueChange={(value) => handleChange("favorite_list_id", (value && value !== 'all') ? Number(value) : undefined)}
          />
        </InputGroup>
        <Button
          variant="primary"
          title="Aplicar filtros"
          onPress={handleApply}
        />
      </View>
    </Offcanvas>
  );
}

const styles = StyleSheet.create({
  keywordAutocomplete: {
    position: "relative",
    width: "100%",
    zIndex: 2,
  },
  keywordList: {
    backgroundColor: "#fff",
    borderColor: "#f2f2f2",
    borderRadius: 6,
    borderTopWidth: 1,
    left: 0,
    margin: 0,
    marginTop: 5,
    maxHeight: 150,
    position: "absolute",
    right: 0,
    top: 40,
    width: "100%",
    zIndex: 3,
  },
  keywordItem: {
    fontSize: 14,
    margin: 3,
  },
});
