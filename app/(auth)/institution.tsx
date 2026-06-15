import AppVersion from '@/components/AppVersion';
import env from "@/config.json";
import { useAuth } from '@/context/AuthContext';
import { handleRequestError } from '@/util';
import { emailSchema, stringSchema } from '@/validation/schemas';
import { FontAwesome6 } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from "react";
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as z from 'zod';

const logo = require("@/assets/images/logo.png");

const schema = z.object({
  email: emailSchema,
  password: stringSchema.min(6, 'A senha deve ter ao menos 6 caracteres'),
});

type Inputs = z.infer<typeof schema>;

export default function InstitutionScreen() {
  const insets = useSafeAreaInsets();
  const { onLogin } = useAuth();
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await axios.post(`${env.API_URL}/login`, data);
      onLogin(response.data);
    } catch (e) {
      const error = (e as any);
      handleRequestError<Inputs>({
        error,
        setError,
        fallbackField: 'email',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardView}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.shell,
          {
            paddingTop: insets.top + 14,
            paddingBottom: insets.bottom + 12,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        alwaysBounceVertical={false}
        bounces={false}
      >
        <View style={styles.content}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <FontAwesome6 name="arrow-left-long" size={22} color="#fff" />
          </Pressable>

          <View style={styles.brandArea}>
            <Image style={styles.logo} source={logo} contentFit="contain" />
          </View>

          <View style={styles.mainCard}>
            <View style={styles.partnerHero}>
              <View style={styles.heroHeader}>
                <View style={styles.heroIcon}>
                  <FontAwesome6 name="building-columns" size={18} color="#fff" />
                </View>
                <Text style={styles.heroTitle}>
                  Sou instituição e quero apoiar o turismo da minha região
                </Text>
              </View>
              <Text style={styles.heroDescription}>
                Cadastre atividades e programações do município na sua região.
              </Text>

              <View style={styles.form}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.field}>
                      <Text style={styles.label}>E-mail</Text>
                      <TextInput
                        style={[styles.input, errors.email && styles.inputInvalid]}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#91a49e"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="email-address"
                        autoComplete="email"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                      {errors.email && (
                        <Text style={styles.errorText}>{errors.email.message}</Text>
                      )}
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.field}>
                      <Text style={styles.label}>Senha</Text>
                      <TextInput
                        style={[styles.input, errors.password && styles.inputInvalid]}
                        placeholder="Digite sua senha"
                        placeholderTextColor="#91a49e"
                        value={value}
                        onChangeText={onChange}
                        autoComplete="current-password"
                        secureTextEntry
                      />
                      {errors.password && (
                        <Text style={styles.errorText}>{errors.password.message}</Text>
                      )}
                    </View>
                  )}
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.submitButton,
                    pressed && styles.submitButtonPressed,
                    isSubmitting && styles.submitButtonDisabled,
                  ]}
                  disabled={isSubmitting}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.submitButtonText}>
                    {isSubmitting ? 'Entrando...' : 'Entrar'}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.loginLinks}>
                <Pressable onPress={() => router.push('/forgot-password')}>
                  <Text style={styles.forgotLink}>Esqueci minha senha</Text>
                </Pressable>

                <View style={styles.createAccount}>
                  <Text style={styles.createHint}>Ainda não tem conta?</Text>
                  <Pressable
                    style={({ pressed }) => [styles.signupButton, pressed && styles.signupButtonPressed]}
                    onPress={() => router.push('/partner')}
                  >
                    <Text style={styles.signupButtonText}>Cadastrar instituição</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          <AppVersion style={styles.version} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#287a6d',
  },
  shell: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#287a6d',
    paddingHorizontal: 18,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingRight: 12,
    marginBottom: 2,
  },
  brandArea: {
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingBottom: 50,
  },
  logo: {
    width: 230,
    maxWidth: '100%',
    height: 70,
  },
  mainCard: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 22,
    backgroundColor: '#fff',
    shadowColor: '#102f2a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 6,
  },
  partnerHero: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 14,
    backgroundColor: '#f3faf7',
    borderWidth: 1,
    borderColor: '#d5e7e1',
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  heroIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#62b55a',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    shadowColor: '#62b55a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 4,
  },
  heroTitle: {
    flex: 1,
    color: '#21403a',
    fontSize: 17,
    fontWeight: 700,
    lineHeight: 20,
  },
  heroDescription: {
    color: '#6a817b',
    fontSize: 13,
    lineHeight: 18,
  },
  form: {
    gap: 13,
    marginTop: 22,
  },
  field: {
    gap: 6,
  },
  label: {
    color: '#21403a',
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 16,
  },
  input: {
    width: '100%',
    minHeight: 46,
    borderWidth: 1,
    borderColor: '#d5e7e1',
    borderRadius: 13,
    backgroundColor: '#fff',
    color: '#21403a',
    fontSize: 14,
    paddingHorizontal: 13,
  },
  inputInvalid: {
    borderColor: '#dc3545',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    lineHeight: 15,
  },
  submitButton: {
    width: '100%',
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: '#62b55a',
    borderWidth: 1,
    borderColor: '#62b55a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonPressed: {
    backgroundColor: '#4a9744',
    borderColor: '#4a9744',
    transform: [{ scale: 0.985 }],
  },
  submitButtonDisabled: {
    opacity: 0.72,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 20,
  },
  loginLinks: {
    alignItems: 'center',
    gap: 13,
    marginTop: 14,
  },
  forgotLink: {
    color: '#4a9744',
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 16,
  },
  createAccount: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  createHint: {
    color: '#6a817b',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
  },
  signupButton: {
    width: '100%',
    minHeight: 42,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#62b55a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonPressed: {
    backgroundColor: '#edf8ea',
    borderColor: '#4a9744',
    transform: [{ scale: 0.985 }],
  },
  signupButtonText: {
    color: '#4a9744',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 18,
  },
  version: {
    fontWeight: 500,
    marginTop: 8,
    opacity: 0.72,
  },
});
