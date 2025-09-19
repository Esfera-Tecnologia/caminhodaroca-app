import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Property {
  gallery: string[];
}

interface ImageGalleryProps {
  property: Property;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ property }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const { width, height } = Dimensions.get("window");

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const onModalLayout = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: selectedIndex * width, animated: false });
    }
  };
  return (
    <View>
      {/* Galeria horizontal */}
      <ScrollView horizontal contentContainerStyle={{ paddingBottom: 8 }} style={{ marginBottom: 24 }}>
        {property.gallery.map((img, i) => (
          <TouchableOpacity key={i} onPress={() => openModal(i)} style={styles.previewContainer}>
            <Image source={{ uri: img } as ImageSourcePropType} style={styles.preview} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal de preview */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBackground} onLayout={onModalLayout}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {property.gallery.map((img, i) => (
              <View key={i} style={{ width, height, justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={{ uri: img } as ImageSourcePropType}
                  style={{ width: width * 0.9, height: height * 0.7, resizeMode: "contain" }}
                />
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    marginRight: 8,
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  closeText: {
    fontSize: 28,
    color: "#fff",
  },
});

export default ImageGallery;
