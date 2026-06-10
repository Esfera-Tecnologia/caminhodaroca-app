import env from "@/config.json";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Toast } from "toastify-react-native";

type AvatarProps = {
  style?: StyleProp<ViewStyle>
}

export default function Avatar({style}: AvatarProps) {
  const { user, setUser, getToken } = useAuth();
  const handleChangePhoto = async () => {
    try {
      // Pede permissão para acessar a galeria
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Toast.error("É necessário permitir o acesso à galeria para atualizar a foto.");
        return;
      }
      // Seleciona a imagem
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });
      if (pickerResult.canceled) return;

      // Cria o FormData para enviar
      const formData = new FormData();
      const asset = pickerResult.assets[0];
      const localUri = asset.uri;
      const filename = asset.fileName ?? localUri.split("/").pop() ?? "avatar.jpg";
      const ext = filename.split(".").pop()?.toLowerCase() ?? "jpg";
      const type = asset.mimeType ?? (ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`);

      formData.append("photo", {
        uri: localUri,
        name: filename,
        type,
      } as any);

      const { data: body } = await axios.post(
        `${env.API_URL}/profile/photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${await getToken()}`,
          Accept: "application/json",
          },
        }
      );
      // Atualiza o avatar no contexto
      if (body.filePath) {
        setUser({ ...user!, avatar: body.filePath });
      }
      Toast.success("Foto de perfil atualizada com sucesso!", "top", undefined, undefined, true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status && error.response.status < 500) {
        const photoError = error.response.data?.errors?.photo;
        Toast.error(Array.isArray(photoError) ? photoError[0] : photoError, "top", undefined, undefined, true);
        return;
      }
      Toast.error("Não foi possível atualizar a foto. Tente novamente mais tarde.", "top", undefined, undefined, true);
    }
  };


  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={handleChangePhoto}>
        <Image source={user?.avatar || require('@/assets/images/avatar.png')} style={styles.avatar} />
        <View style={styles.iconContainer}>
          <FontAwesome6 name="camera" size={16} color={theme.colors.body} />
        </View>
      </Pressable>
      <Text style={styles.name}>{user?.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  iconContainer: {
    display: 'flex',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    position: 'absolute',
    bottom: 8,
    right: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  name: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: theme.colors.body,
  },
})
