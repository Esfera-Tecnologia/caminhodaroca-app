import Button from "@/components/Button";
import Input from "@/components/controls/Input";
import InputGroup from "@/components/controls/InputGroup";
import Select from "@/components/controls/Select";
import Offcanvas, { OffcanvasProps } from "@/components/Offcanvas";
import { useCategories } from "@/hooks/useCategories";
import { useCities } from "@/hooks/useCities";
import { useSubcategories } from "@/hooks/useSubcategories";
import { useState } from "react";
import { View } from "react-native";

export type PropertyFilters = {
  keyword?: string;
  categories?: number[];
  subcategories?: number[];
  propertyLocationId?: number; 
  useCurrentLocation?: boolean;
  favorites?: boolean;
};

interface HomeFiltersProps extends OffcanvasProps {
  onApply: (filters: PropertyFilters) => void;
}

export default function HomeFilters({ onApply, ...props }: HomeFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilters>({
    categories: [],
    subcategories: [],
  });

  const { categories } = useCategories();
  const { subcategories } = useSubcategories(filters.categories);
  const { cities } = useCities('RJ', true);

  const handleChange = (key: keyof PropertyFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    props.onClose();
  }

  return (
    <Offcanvas {...props}>
      <View>
        <InputGroup label="Localização Atual">
          <Select
            options={[
              { label: "Sim", value: true },
              { label: "Não", value: false },
            ]}
            selectedValue={filters.useCurrentLocation}
            onValueChange={(value) =>
              handleChange("useCurrentLocation", value)
            }
          />
        </InputGroup>
        <InputGroup label="Localização da Propriedade">
          <Select
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
            options={subcategories}
            selectedValue={filters.subcategories}
            onValueChange={(values) =>
              handleChange("subcategories", Array.isArray(values) ? values?.map(Number) : [Number(values)])
            } />
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
