import AuthContainer from '@/components/AuthContainer';
import { theme } from '@/theme';
import { router } from 'expo-router';
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function EntryScreen() {
  return (
    <AuthContainer title="Como deseja continuar?">
      <Pressable style={({pressed}) => [pressed && styles.pressed, styles.button]} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Entrar com Login</Text>
      </Pressable>
      <Pressable style={({pressed}) => [pressed && styles.pressed, styles.button]} onPress={() => router.push('/register')}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </Pressable>
      <Pressable style={({pressed}) => [pressed && styles.pressed, styles.button]} onPress={() => router.replace('/home/property')}>
        <Text style={styles.buttonText}>Entrar sem Login</Text>
      </Pressable>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    padding: 12,
    width: '80%',
    borderRadius: 6,
    marginBottom: 20,
  },
  pressed: {
    backgroundColor: '#62B55A',
  },
  buttonText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
  },
})
