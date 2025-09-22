import BackButton from '@/components/BackButton';
import Card from '@/components/Card';
import Input from '@/components/controls/Input';
import InputGroup from '@/components/controls/InputGroup';
import PrimaryButton from '@/components/PrimaryButton';
import { globalStyles } from '@/styles/global';
import { theme } from '@/theme';
import { Link } from 'expo-router';
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ResetPassword() {
  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
      <View style={[globalStyles.row, globalStyles.flexCenter, {marginVertical: 40}]}>
        <BackButton style={{position: 'absolute', left: 0}}/>
        <Text style={styles.title}>Redefinir Senha</Text>
      </View>
      <Card>
        <Text style={styles.description}>Informe a nova senha de acesso para a sua conta</Text>
        <InputGroup label="E-mail">
          <Input placeholder="Digite seu e-mail" />
        </InputGroup>
        <InputGroup label="Nova senha">
          <Input placeholder="Digite sua senha"/>
        </InputGroup>
        <InputGroup label="Confirmar senha">
          <Input placeholder="Digite sua senha"/>
        </InputGroup>
        <PrimaryButton label="Enviar" style={{marginBottom: 12}}/>
        <Link href="/login" style={styles.link}>Voltar para tela de login</Link>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#006b5f',
    flexGrow: 1,
    padding: 12,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 500,
  },
  description: {
    color: theme.colors.secondary,
    marginBottom: 8,
  },
  link: {
    color: "rgba(33, 37, 41, 0.75)",
    fontSize: 14,
    textAlign: 'center'
  }
})
