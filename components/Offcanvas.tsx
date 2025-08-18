import { globalStyles } from "@/styles/global";
import { Feather } from "@expo/vector-icons";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from "react-native";

const { width } = Dimensions.get("window");

type HorizontalDirection = "left" | "right";

export interface OffcanvasProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  direction?: HorizontalDirection;
  size?: number;
}

const Offcanvas: React.FC<OffcanvasProps> = ({
  isOpen,
  title,
  onClose,
  children,
  direction = "left",
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(isOpen);

  const offcanvasWidth = width;
  const fromValue = direction === "left" ? -offcanvasWidth : offcanvasWidth;


  // Atualiza a visibilidade interna
  useEffect(() => {
    if (isOpen) {
      // Primeiro torna visível
      setVisible(true);
      // Depois anima
      translateX.setValue(fromValue);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Fecha animando
      Animated.timing(translateX, {
        toValue: fromValue,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Quando animação termina, remove o modal
        setVisible(false);
      });
    }
  }, [isOpen]);

  if (!visible) return null;

  const offcanvasStyle: ViewStyle = {
    width: offcanvasWidth,
    height: "100%",
    transform: [{ translateX }],
    ...(direction === "right" ? { right: 0, left: undefined } : {}),
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View style={[styles.offcanvas, offcanvasStyle]}>
        <View style={[globalStyles.row, globalStyles.itemsCenter, globalStyles.spaceBetween, styles.header]}>
          <Text style={styles.title}>{title}</Text>
          <Pressable onPress={onClose}>
            <Feather name="x" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.body}>
          {children}
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  offcanvas: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
  },
  body: {
    padding: 16,
    flexShrink: 0
  },
  backdrop: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    fontSize: 20,
    color: "#212529",
    fontWeight: 500,
  }
});

export default Offcanvas;
