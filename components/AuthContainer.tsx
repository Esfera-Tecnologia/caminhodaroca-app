import { theme } from "@/theme";
import { Image } from "expo-image";
import { Href } from "expo-router";
import React, { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppVersion from "./AppVersion";
import BackButton from "./BackButton";

const logo = require("@/assets/images/logo.png");

interface AuthContainerProps extends PropsWithChildren {
  title: string;
  withBackButton?: boolean;
  backRoute?: Href;
  logoMargin?: number;
}
export default function AuthContainer({title, children, logoMargin = 100, withBackButton = false, backRoute}: AuthContainerProps) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
      <ScrollView style={{flex: 1}} contentContainerStyle={[styles.container, {paddingTop: insets.top + 24,  paddingBottom: insets.bottom + 24}]} alwaysBounceVertical={false} bounces={false}>
        <Image style={[styles.logo, {marginBottom: logoMargin}]} source={logo} contentFit="contain" />
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
  },
  logo: {
    height: 70,
    width: '100%',
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
})
