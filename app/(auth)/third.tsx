import AuthPresentation from "@/components/AuthPresentation";
import DarkGreenButton from "@/components/DarkGreenButton";
import { globalStyles } from "@/styles/global";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";

const background = require("@/assets/images/background-3.jpg");

export default function Third() {
  return (
    <AuthPresentation background={background}>
      <Text style={globalStyles.title}>
        Bem-vindo ao{"\n"}
        Caminho da Roça
      </Text>
      <Text style={globalStyles.subtitle}>
        Vamos começar sua jornada?
      </Text>
      <DarkGreenButton
        label="Começar"
        onPress={() => router.push('/entry')} />
    </AuthPresentation>
  );
}
