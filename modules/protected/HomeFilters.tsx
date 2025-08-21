import Button from "@/components/Button";
import Input from "@/components/controls/Input";
import InputGroup from "@/components/controls/InputGroup";
import Select from "@/components/controls/Select";
import Offcanvas, { OffcanvasProps } from "@/components/Offcanvas";
import { useCategories } from "@/hooks/useCategories";
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
              { label: "Sim", value: "true" },
              { label: "Não", value: "false" },
            ]}
            selectedValue={filters.useCurrentLocation ? "true" : "false"}
            onValueChange={(value) =>
              handleChange("useCurrentLocation", value === "true")
            }
          />
        </InputGroup>

        <InputGroup label="Localização da Propriedade">
          <Select
            options={[
              { label: "Rio de Janeiro", value: 10 },
              { label: "São Paulo", value: 20 },
            ]}
            selectedValue={filters.propertyLocationId}
            onValueChange={(value) => handleChange("propertyLocationId", Number(value))}
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
            }
          />
        </InputGroup>

        <InputGroup label="Subcategoria">
          <Select
            isMultiple
            options={[
              { label: "Cabana", value: 5 },
              { label: "Casa de Campo", value: 6 },
            ]}
            selectedValue={filters.subcategories?.[0]}
            onValueChange={(value) =>
              handleChange("subcategories", [Number(value)])
            }
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
