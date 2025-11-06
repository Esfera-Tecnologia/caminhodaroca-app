import { globalStyles } from "@/styles/global"
import { theme } from "@/theme"
import { ActivityIndicator, Text, View } from "react-native"

type LoadingListProps = {
  text: string
}

export const LoadingList = ({text}: LoadingListProps) => {
  return (
    <View style={[globalStyles.notification, {padding: 16, borderColor: theme.colors.primary}]}>
      <ActivityIndicator
        size="small"
        color={theme.colors.primary}
        style={{marginEnd: 8}}/>
      <Text style={{color: theme.colors.primary}}>
        {text}
      </Text>
    </View>
  )
}