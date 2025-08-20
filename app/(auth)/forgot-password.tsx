import AuthContainer from '@/components/AuthContainer';
import Card from '@/components/Card';
import Input from '@/components/controls/Input';
import InputGroup from '@/components/controls/InputGroup';
import PrimaryButton from '@/components/PrimaryButton';
import env from "@/config.json";
import { theme } from '@/theme';
import { handleRequestError } from '@/util';
import { emailSchema } from '@/validation/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Link } from 'expo-router';
import React, { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from "react-native";
import z from 'zod';

const schema = z.object({
  email: emailSchema,
});

type Inputs = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [emailWasSended, setEmailWasSended] = useState(false);
  const [feedback, setFeedback] = useState("");
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })
  const onSubmit = async (data: Inputs) => {
    try {
      const response = await axios.post(`${env.API_URL}/api/password/forgot`, {
        email: data.email,
      });
      setEmailWasSended(true);
      setFeedback(response.data.message);
    } catch (e) {
      const error = (e as any);
      handleRequestError<Inputs>({
        error,
        setError,
        fallbackField: 'email',
      })
    }
  }
  return (
    <AuthContainer title="Recuperar senha" withBackButton={true}>
      <Card>
        <Text style={styles.description}>Informe o e-mail da conta cadastrada através do campo abaixo</Text>
        {! emailWasSended ? (
          <>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <InputGroup label="E-mail" error={errors.email}>
                  <Input 
                    placeholder="Digite seu e-mail"
                    value={value}
                    onChangeText={onChange} />
                </InputGroup>
            )}/>
            <PrimaryButton
              label="Enviar link"
              style={{marginBottom: 12}}
              onPress={handleSubmit(onSubmit)} />
          </>
        ) : (
          <View style={styles.success}>
            <Text style={styles.successText}>{feedback}</Text>
          </View>
        )}
        <Link
          href="/"
          style={styles.link}>
            Voltar para tela de login
        </Link>
      </Card>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  description: {
    color: theme.colors.secondary,
    marginBottom: 8,
  },
  success: {
    backgroundColor: "rgb(25,135,84)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  successText: {
    color: "#fff",
    fontSize: 14,
  },
  link: {
    color: "rgba(33, 37, 41, 0.75)",
    fontSize: 14,
    textAlign: 'center'
  }
})
