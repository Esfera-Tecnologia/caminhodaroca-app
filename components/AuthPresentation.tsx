import React, { PropsWithChildren } from "react";
import { ImageBackground, ImageSourcePropType, StyleSheet, View } from "react-native";

interface AuthPresentationProps extends PropsWithChildren {
  background: ImageSourcePropType
}

export default function AuthPresentation({background, children}: AuthPresentationProps) {
  return (
    <ImageBackground
      source={background}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 76,
    alignItems: "center",
  },
});
