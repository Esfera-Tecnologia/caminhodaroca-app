import React, { PropsWithChildren } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";


interface DefaultModalProps extends PropsWithChildren {
  visible: boolean,
  onClose?: () => void,
}
export default function DefaultModal({visible, onClose, children}: DefaultModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose && onClose();
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    maxHeight: "80%",
  },
});
