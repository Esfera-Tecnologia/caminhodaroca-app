import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "react-native";

type EmptyListType = {
  text: string;
}

export const EmptyList = ({text}: EmptyListType) => {
  return (
    <View style={[globalStyles.notification, {padding: 16, borderColor: theme.colors.warning}]}>
      <FontAwesome6
        name="question-circle"
        size={24}
        color={theme.colors.warning}
        style={{marginEnd: 12}} />
      <Text style={{color: theme.colors.secondary, flexShrink: 1}}>
        {text}
      </Text>
    </View>
  )
}