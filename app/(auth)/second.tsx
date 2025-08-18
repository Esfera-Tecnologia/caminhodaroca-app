import AuthPresentation from "@/components/AuthPresentation";
import DarkGreenButton from "@/components/DarkGreenButton";
import { globalStyles } from "@/styles/global";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";

const background = require("@/assets/images/background-2.jpg");

export default function Second() {
  return (
    <AuthPresentation background={background}>
      <Text style={globalStyles.title}>Viva experiências únicas</Text>
      <Text style={globalStyles.subtitle}>
        Turismo rural, produtos naturais e muito mais.
      </Text>
      <DarkGreenButton 
        label="Próximo"
        onPress={() => router.push('/third')}/>
    </AuthPresentation>
  );
}
