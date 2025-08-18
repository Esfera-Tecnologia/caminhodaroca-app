import AuthContainer from '@/components/AuthContainer';
import Card from '@/components/Card';
import Input from '@/components/controls/Input';
import InputGroup from '@/components/controls/InputGroup';
import PrimaryButton from '@/components/PrimaryButton';
import { Link } from 'expo-router';
import React from "react";
import { StyleSheet } from "react-native";

export default function Login() {
  return (
    <AuthContainer title="Entrar com Login" withBackButton={true}>
      <Card>
        <InputGroup label="E-mail">
          <Input placeholder="Digite seu e-mail" />
        </InputGroup>
        <InputGroup label="Senha">
          <Input placeholder="Digite sua senha"/>
        </InputGroup>
        <PrimaryButton label="Entrar" style={{marginBottom: 12}}/>
        <Link href="/reset-password" style={styles.link}>Esqueci minha senha</Link>
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
