import { theme } from "@/theme";
import { Image } from "expo-image";
import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppVersion from "./AppVersion";

const logo = require("@/assets/images/logo.png");

interface AuthContainerProps extends PropsWithChildren {
  title: string;
}
export default function AuthContainer({title, children}: AuthContainerProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} contentFit="contain" />
      <Text style={styles.title}>
        {title}
      </Text>
      {children}
      <AppVersion /> 
    </View>
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
