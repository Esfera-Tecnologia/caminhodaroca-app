import AuthContainer from '@/components/AuthContainer';
import Card from '@/components/Card';
import Input from '@/components/controls/Input';
import InputGroup from '@/components/controls/InputGroup';
import PrimaryButton from '@/components/PrimaryButton';
import { theme } from '@/theme';
import { Link } from 'expo-router';
import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Login() {
  return (
    <AuthContainer title="Recuperar senha" withBackButton={true}>
      <Card>
        <Text style={styles.description}>Informe o e-mail da conta cadastrada através do campo abaixo</Text>
        <InputGroup label="E-mail">
          <Input placeholder="Digite seu e-mail" />
        </InputGroup>
        <PrimaryButton label="Enviar link" style={{marginBottom: 12}}/>
        <Link href="/" style={styles.link}>Voltar para tela de login</Link>
      </Card>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
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
