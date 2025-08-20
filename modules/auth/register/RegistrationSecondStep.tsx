import Button from "@/components/Button";
import CheckboxGroup from "@/components/controls/CheckboxGroup";
import ErrorMessage from "@/components/controls/ErrorMessage";
import InputGroup from "@/components/controls/InputGroup";
import Select from "@/components/controls/Select";
import { useCategories } from "@/hooks/useCategories";
import { useSubcategories } from "@/hooks/useSubcategories";
import { globalStyles } from "@/styles/global";
import { registrationSchema } from "@/validation/schemas";
import { useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import z from "zod";

type FormData = z.infer<typeof registrationSchema>;

export default function RegistrationSecondStep()  {
  const {
    control,
    watch,
    reset,
    formState: { errors }
  } = useFormContext<FormData>();

  const category = watch('category');
  const {categories} = useCategories();
  const {subcategories} = useSubcategories(category);
  const [key, setKey] = useState(0);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subcategories",
  });
  return (
    <View>
      <Text style={styles.title}>Preferências</Text>
      <InputGroup label="Categoria" error={errors.category}>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <Select
              key={key}
              placeholder="Selecione uma categoria"
              onValueChange={onChange} 
              selectedValue={value || ''}
              options={categories} />
        )} />
      </InputGroup>
      {category && (
        <View style={styles.subcategories}>
          <View style={[globalStyles.row, globalStyles.itemsCenter, globalStyles.spaceBetween, {marginBottom: 2}]}>
            <Text style={styles.category}>
              {categories.find((model) => model.value == category)?.label}
            </Text>
            <Button
              variant="danger"
              title="Remover"
              outline={true}
              style={{paddingVertical: 2}}
              textStyle={{fontSize: 12}}
              onPress={() => {
                reset({category: undefined, subcategories: []})
                setKey(prev => prev + 1);
              }} />
          </View>
          <View>
            {subcategories.map((sub) => {
              const isChecked = fields.findIndex(f => f.value === sub.value) !== -1;
              return (
                <CheckboxGroup
                  key={sub.value}
                  size="md"
                  margin={8}
                  value={isChecked}
                  label={sub.label}
                  onValueChange={(checked: boolean) => {
                    if (checked) {
                      append({ value: sub.value });
                    } else {
                      const index = fields.findIndex(f => f.value === sub.value);
                      if (index !== -1) remove(index);
                    }
                  }}
                />
              );
            })}
            {errors.subcategories && (
              <ErrorMessage>{errors.subcategories.message}</ErrorMessage>
            )}
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#00473c',
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  category: {
    fontWeight: 700,
    color: "#333",
  },
  subcategories: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  }
})