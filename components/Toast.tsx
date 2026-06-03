// components/Toast.tsx

import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ToastVariant = "success" | "warn" | "error" | "info" | "default";

interface ToastProps {
  visible: boolean;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onHide?: () => void;
}

const Colors = {
  light: {
    text: "#000",
    back: "#ffffff",
  },
  dark: {
    text: "#ffffff",
    back: "#2B2D2E",
  },
  default: "#3498db",
  info: "#3498db",
  success: "#07bc0c",
  warn: "#f1c40f",
  error: "#e74c3c",
  textDefault: "#4c4c4c",
  textDark: "black",
};

const { width } = Dimensions.get("window");

const SCALE = (size: number, androidRatio = 1, iOSRatio = 1) => {
  const baseWidth = 375;
  const scaleFactor = Math.min(width / baseWidth, 1.2);
  const platformRatio = Platform.OS === "android" ? androidRatio : iOSRatio;
  const densityAdjustment = 3 / PixelRatio.get();
  const newSize = size * scaleFactor * platformRatio * densityAdjustment;
  const minSize = size * (Platform.OS === "android" ? androidRatio : 0.8);
  const maxSize = size * 1.3;

  return Math.min(Math.max(newSize, minSize), maxSize);
};

const toastByVariant: Record<
  ToastVariant,
  { icon: keyof typeof Ionicons.glyphMap; color: string }
> = {
  success: { icon: "checkmark-circle", color: Colors.success },
  warn: { icon: "warning", color: Colors.warn },
  error: { icon: "alert-circle", color: Colors.error },
  info: { icon: "information-circle", color: Colors.info },
  default: { icon: "checkmark-circle", color: Colors.default },
};

export function Toast({
  visible,
  message,
  variant = "success",
  duration = 6000,
  onHide,
}: ToastProps) {
  const [translateY] = useState(() => new Animated.Value(-120));
  const [opacity] = useState(() => new Animated.Value(0));
  const [progress] = useState(() => new Animated.Value(100));
  const isHiding = useRef(false);

  const toastConfig = toastByVariant[variant];
  const progressWidth = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
      }),
    [progress]
  );

  const hideToast = useCallback(() => {
    if (isHiding.current) return;
    isHiding.current = true;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  }, [onHide, opacity, translateY]);

  useEffect(() => {
    if (visible) {
      isHiding.current = false;
      progress.setValue(100);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.timing(progress, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }).start();

      const timeout = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [duration, hideToast, message, opacity, progress, translateY, variant, visible]);

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View pointerEvents="box-none" style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={hideToast}
          style={styles.hideButton}
        >
          <Ionicons
            name="close-outline"
            size={SCALE(22)}
            color={Colors.light.text}
          />
        </TouchableOpacity>

        <View pointerEvents="none" style={styles.content}>
          <View style={styles.contentInner}>
            <Ionicons
              name={toastConfig.icon}
              size={SCALE(22)}
              color={toastConfig.color}
              style={styles.iconWrapper}
            />
            <View style={styles.textContainer}>
              <Text allowFontScaling={false} style={styles.message}>
                {message}
              </Text>
            </View>
          </View>
        </View>

        <View pointerEvents="none" style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                backgroundColor: toastConfig.color,
                width: progressWidth,
              },
            ]}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    alignSelf: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 9999,
  },

  container: {
    width: "90%",
    minHeight: SCALE(61),
    borderRadius: 8,
    backgroundColor: Colors.light.back,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  hideButton: {
    position: "absolute",
    top: SCALE(3.2),
    right: SCALE(3.2),
    zIndex: 9999999,
  },

  content: {
    width: "100%",
  },

  contentInner: {
    paddingHorizontal: SCALE(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  iconWrapper: {
    marginRight: SCALE(8),
  },

  textContainer: {
    flex: 1,
  },

  message: {
    color: Colors.light.text,
    fontSize: SCALE(14),
    fontWeight: "500",
    marginRight: SCALE(25),
  },

  progressBarContainer: {
    flexDirection: "row",
    position: "absolute",
    height: 4,
    width: "100%",
    bottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
  },
});
