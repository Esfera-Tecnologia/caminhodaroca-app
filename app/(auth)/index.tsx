import AuthPresentation from "@/components/AuthPresentation";
import DarkGreenButton from "@/components/DarkGreenButton";
import LinkButton from "@/components/LinkButton";
import { globalStyles } from "@/styles/global";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";

const background = require("@/assets/images/background-1.jpg");

export default function App() {
  return (
    <AuthPresentation background={background}>
      <Text style={globalStyles.title}>Explore o campo</Text>
      <Text style={globalStyles.subtitle}>
        Descubra propriedades rurais incríveis próximas de você.
      </Text>
      <DarkGreenButton
        label="Próximo"
        onPress={() => router.push('/second')}
        style={{marginBottom: 12}}/>
      <LinkButton 
        label="Pular apresentação"
        onPress={() => router.push('/entry')} />
    </AuthPresentation>
  );
}