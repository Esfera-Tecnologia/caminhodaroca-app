import env from "@/config.json";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/theme";
import { FontAwesome6 } from "@expo/vector-icons";
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
        quality: 0.8,
      });
      if (pickerResult.canceled) return;

      // Cria o FormData para enviar
      const formData = new FormData();
      const localUri = pickerResult.assets[0].uri;
      const filename = localUri.split("/").pop()!;
      const ext = filename.split(".").pop();
      const type = ext === "jpg" ? "image/jpeg" : `image/${ext}`;

      formData.append("photo", {
        uri: localUri,
        name: filename,
        type,
      } as any);

      // Faz a requisição com fetch
      const response = await fetch(`${env.API_URL}/profile/photo`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      // Atualiza o avatar no contexto
      if (data.filePath) {
        setUser({ ...user!, avatar: data.filePath });
      }
      Toast.success("Foto de perfil atualizada com sucesso!", "top", undefined, undefined, true);
    } catch {
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
