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
import { useSubcategories } from "@/hooks/useSubcategories";
import { useEffect, useState } from "react";
import { View } from "react-native";

export type PropertyFilters = {
  keyword?: string;
  categories?: number[];
  subcategories?: number[];
  propertyLocationId?: number; 
  useCurrentLocation?: boolean;
  favorite_list_id?: number;
};

interface HomeFiltersProps extends OffcanvasProps {
  onApply: (filters: PropertyFilters) => void;
}

export default function HomeFilters({ onApply, onClose, isOpen, ...props }: HomeFiltersProps) {
  const { user } = useAuth();
  const {location: userLocation} = useUserLocation();
  const [filters, setFilters] = useState<PropertyFilters>({
    categories: [],
    subcategories: [],
  });

  const { categories } = useCategories();
  const { subcategories } = useSubcategories(filters.categories);
  const { cities } = useCities('RJ', true);
  const { lists } = useFavoriteLists();

  const handleChange = (key: keyof PropertyFilters, value: any) => {
    const newFilters = {...filters, [key]: value};
    setFilters(newFilters);

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
    onApply(filters);
    onClose();
  }

  useEffect(() => {
    if(filters.useCurrentLocation && filters.propertyLocationId !== undefined) {
      setFilters((prev) => ({ ...prev, propertyLocationId: undefined }));
    }
  }, [filters]);

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
        <InputGroup label="Palavra-chave">
          <Input
            placeholder="Ex: queijos, passeios..."
            value={filters.keyword}
            onChangeText={(text) => handleChange("keyword", text)}
          />
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
