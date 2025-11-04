import AuthContainer from '@/components/AuthContainer';
import { theme } from '@/theme';
import { router } from 'expo-router';
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EntryScreen() {
  return (
    <AuthContainer title="Como deseja continuar?" logoMargin={25}>
      <Pressable style={({pressed}) => [pressed && styles.pressed, styles.button]} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Entrar com Login</Text>
      </Pressable>
      <Pressable style={({pressed}) => [pressed && styles.pressed, styles.button]} onPress={() => router.push('/register')}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </Pressable>
      <Pressable style={({pressed}) => [pressed && styles.pressed, styles.button]} onPress={() => router.replace('/home/property')}>
        <Text style={styles.buttonText}>Entrar sem Login</Text>
      </Pressable>
      <View style={styles.partnerCard}>
        <Text style={styles.cardTitle}>Divulgue suas experiências rurais</Text>
        <Text style={styles.cardDescription}>
          Cadastre-se como <Text style={{fontWeight: 700}}>parceiro Caminho da Roça</Text>{" "}
          e conecte-se com visitantes interessados na vida do campo.
        </Text>
        <Pressable style={({pressed}) => [pressed && styles.pressed, styles.cardButton]}>
          <Text style={styles.cardButtonText}>
            Quero ser parceiro
          </Text>
        </Pressable>
      </View>
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
  partnerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: '80%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#fff",
    textAlign: 'center',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 15,
    fontWeight: 400,
    color: "#fff",
    textAlign: 'center',
    marginBottom: 16,
  },
  cardButton: {
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  cardButtonText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
    textAlign: 'center'
  }
})
