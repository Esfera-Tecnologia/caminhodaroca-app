import InputGroup from "@/components/controls/InputGroup";
import Select from "@/components/controls/Select";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

export default function RegistrationSecondStep()  {
  const { control, formState: { errors } } = useFormContext();

  return (
    <View>
      <Text style={styles.title}>Preferências</Text>
      <Controller
        control={control}
        name="state"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Categoria" error={errors.state}>
            <Select
              placeholder="Selecione uma categoria"
              onValueChange={onChange} 
              selectedValue={value}
              options={[]} />
          </InputGroup>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: '#00473c',
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
})