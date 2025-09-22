import { theme } from "@/theme";
import { Image } from "expo-image";
import { Href } from "expo-router";
import React, { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import AppVersion from "./AppVersion";
import BackButton from "./BackButton";

const logo = require("@/assets/images/logo.png");

interface AuthContainerProps extends PropsWithChildren {
  title: string;
  withBackButton?: boolean;
  backRoute?: Href;
}
export default function AuthContainer({title, children, withBackButton = false, backRoute}: AuthContainerProps) {
  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <Image style={styles.logo} source={logo} contentFit="contain" />
        {withBackButton && (
          <BackButton style={{position: 'absolute', top: 48, left: 12}} backRoute={backRoute} />
        )}
        <Text style={styles.title}>
          {title}
        </Text>
        {children}
        <AppVersion /> 
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
  },
  logo: {
    height: 70,
    width: '100%',
    marginBottom: 100,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
})
