import AuthContainer from '@/components/AuthContainer';
import Card from '@/components/Card';
import Input from '@/components/controls/Input';
import InputGroup from '@/components/controls/InputGroup';
import PrimaryButton from '@/components/PrimaryButton';
import env from "@/config.json";
import { useAuth } from '@/context/AuthContext';
import { handleRequestError } from '@/util';
import { emailSchema, stringSchema } from '@/validation/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Link } from 'expo-router';
import React from "react";
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from "react-native";
import z from 'zod';

const schema = z.object({
  email: emailSchema,
  password: stringSchema.min(6, 'A senha deve ter ao menos 6 caracteres'),
});

type Inputs = z.infer<typeof schema>;

export default function Login() {
  const { onLogin } = useAuth();
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })
  const onSubmit = async (data: Inputs) => {
    try {
      const response = await axios.post(`${env.API_URL}/login`, data);
      onLogin(response.data);
    } catch (e) {
      const error = (e as any)
      handleRequestError<Inputs>({
        error,
        setError,
        fallbackField: 'email',
      })
    }
  }
  return (
    <AuthContainer title="Entrar com Login" withBackButton={true} backRoute="/entry">
      <Card>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputGroup label="E-mail" error={errors.email}>
              <Input
                placeholder="Digite seu e-mail"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </InputGroup>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputGroup label="Senha" error={errors.password}>
              <Input
                placeholder="Digite sua senha"
                secureTextEntry
                autoComplete="current-password"
                value={value}
                onChangeText={onChange}
              />
            </InputGroup>
          )}
        />
        <PrimaryButton 
          label="Entrar"
          style={{marginBottom: 12}}
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}/>
        <Link
          href="/forgot-password"
          style={styles.link}>
            Esqueci minha senha
        </Link>
      </Card>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  link: {
    color: "rgba(33, 37, 41, 0.75)",
    fontSize: 14,
    textAlign: 'center'
  }
})
