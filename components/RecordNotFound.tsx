import { theme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecordNotFound()
{
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Feather name="search" size={24} color={theme.colors.primary} />
      <Text style={styles.title}>Ooops!</Text>
      <Text style={styles.description}>Parece que o registro que voce buscava não foi encontrado</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: theme.colors.primary
  },
  description: {
    color: theme.colors.body
  },
})