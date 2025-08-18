import Input from "@/components/controls/Input";
import InputGroup from "@/components/controls/InputGroup";
import Select from "@/components/controls/Select";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

export default function RegistrationFirstStep()  {
  const { control, formState: { errors } } = useFormContext();

  return (
    <View>
      <Text style={styles.title}>Informações Pessoais</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Nome/Apelido*" error={errors.name}>
            <Input placeholder="Digite seu nome" value={value} onChangeText={onChange} />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="E-mail*" error={errors.email}>
            <Input placeholder="Digite seu e-mail" value={value} onChangeText={onChange} />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Senha*" error={errors.password}>
            <Input
              placeholder="Digite sua senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="state"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Estado*" error={errors.state}>
            <Select options={[]} selectedValue={value} onValueChange={onChange} />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="ageRange"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Faixa Etária*" error={errors.ageRange}>
            <Select
              options={[]}
              selectedValue={value}
              onValueChange={onChange}
            />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="travelWith"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Com quem você viaja">
            <Select
              options={[]}
              selectedValue={value}
              onValueChange={onChange}
            />
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