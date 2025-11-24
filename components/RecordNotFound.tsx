import { theme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./Button";

export default function RecordNotFound()
{
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Feather name="search" size={24} color={theme.colors.primary} />
      <Text style={styles.title}>Ooops!</Text>
      <Text style={styles.description}>Parece que o registro que voce buscava {"\n"} não está mais disponível.</Text>
      <Button variant="primary" title="Voltar para tela anterior" onPress={() => router.back()} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: theme.colors.primary,
    marginBottom: 12,
  },
  description: {
    textAlign: 'center',
    color: theme.colors.body,
    marginBottom: 12,
  },
})