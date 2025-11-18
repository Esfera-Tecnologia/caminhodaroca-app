import Button from "@/components/Button";
import InputGroup from "@/components/controls/InputGroup";
import Select from "@/components/controls/Select";
import Offcanvas, { OffcanvasProps } from "@/components/Offcanvas";
import { useCities } from "@/hooks/useCities";
import { useState } from "react";
import { View } from "react-native";

export type PartnerFilters = {
  search?: string;
  cities?: string[];
  categories?: number[];
  subcategories?: number[];
};

interface PartnerFilterProps extends OffcanvasProps {
  onApply: (filters: PartnerFilters) => void;
}

export default function PartnerAdvancedFilters({ onApply, onClose, isOpen, ...props }: PartnerFilterProps) {
  const [filters, setFilters] = useState<PartnerFilters>({
    categories: [],
    subcategories: [],
    cities: [],
  });

  const { cities } = useCities('RJ', false);

  const handleChange = (key: keyof PartnerFilters, value: any) => {
    const newFilters = {...filters, [key]: value};
    setFilters(newFilters);

    const noFiltersApplied = (!newFilters.cities || newFilters.cities.length === 0)

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
  return (
    <Offcanvas {...props} onClose={onClose} isOpen={isOpen}>
      <View>
        <InputGroup label="Município">
          <Select
            isMultiple
            options={cities}
            selectedValue={filters.cities}
            onValueChange={(values) =>
              handleChange("cities", Array.isArray(values) ? values?.map(Number) : [Number(values)])
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
