import Constants from 'expo-constants';
import { StyleSheet, Text, TextStyle } from "react-native";

type AppVersionProps = {
  style?: TextStyle,
  theme?: "light" | "dark"
}
export default function AppVersion({style, theme = 'dark'}: AppVersionProps) {
  return (
    <Text style={[styles.version, style, {color: theme === 'light' ? 'rgba(33, 37, 41, 0.75)' : '#fff' }]}>
      Versão {Constants.expoConfig?.version}
    </Text>
  )
}

const styles = StyleSheet.create({
  version: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 24,
  }
})