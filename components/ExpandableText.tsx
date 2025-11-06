import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export const ExpandableText = ({ text, numberOfLines = 3}: { text: string; numberOfLines?: number }) =>  {
  const [expanded, setExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <View>
      <Text
        style={globalStyles.bold}
        numberOfLines={expanded ? undefined : numberOfLines}
        onTextLayout={(e) => {
          if (!expanded) {
            setShowExpandButton(e.nativeEvent.lines.length > numberOfLines);
          }
      }}>{text}</Text>
      {showExpandButton && (
        <Pressable onPress={toggleExpanded}>
          <Text style={{ color: theme.colors.primary, fontSize: 13, fontWeight: 'bold', textDecorationLine: 'underline' }}>
            {expanded ? "Mostrar menos" : "Mostrar mais"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}