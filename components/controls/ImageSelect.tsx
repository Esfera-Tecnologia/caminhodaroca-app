import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  value?: string | null;
  onChange?: (uri: string | null) => void;
};

export default function ImageSelect({ value, onChange }: Props) {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onChange?.(result.assets[0].uri);
    }
  };
  return (
    <View style={{ alignItems: "flex-start" }}>
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonLabel}>Escolher</Text>
        <Text style={styles.buttonText} numberOfLines={1} >{image ? image.split("/").pop() : 'Nenhuma imagem selecionada'}</Text>
      </Pressable>
      {value && (
        <Image
          source={{ uri: value }}
          style={styles.preview}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    width: '100%'
  },
  buttonLabel: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRightWidth: 1,
    borderColor: "#dee2e6"
  },
  buttonText: {
    padding: 10,
    flexShrink: 1,
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  }
})