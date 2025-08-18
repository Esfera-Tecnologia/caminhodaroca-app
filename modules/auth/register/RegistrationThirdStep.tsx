import CheckboxGroup from "@/components/CheckboxGroup";
import InputGroup from "@/components/controls/InputGroup";
import { globalStyles } from "@/styles/global";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

export default function RegistrationThirdStep() {
  const { control, formState: { errors } } = useFormContext();

  return (
    <View>
      <Text style={styles.title}>Termo de Uso</Text>
      <Text style={globalStyles.paragraph}>
        Leia e aceite o termo de uso para finalizar seu cadastro.
      </Text>
      <InputGroup
        error={errors.terms}
        margin={0}>
        <Controller
          control={control}
          name="terms"
          render={({ field: { onChange, value } }) => (
            <CheckboxGroup 
              size="md"
              margin={16}
              value={value}
              onValueChange={onChange}
              label="Li e concordo com o termo de uso" />
          )}
        />
      </InputGroup>
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