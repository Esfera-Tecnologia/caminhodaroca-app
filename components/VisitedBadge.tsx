import { MaterialIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Text, ViewStyle } from "react-native"

export default function VisitedBadge ({size = 'md'}: {size: 'sm' | 'md'})
{
  const sizes: Record<'sm' | 'md', ViewStyle> = {
    sm: {
      paddingVertical: 4,
      paddingHorizontal: 9,
      marginTop: 6,
    },
    md: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginVertical: 6,
    }
  }
  return (
    <LinearGradient
      colors={['#fff4cc', '#ffe39a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.visitedBadge, sizes[size]]}
    >
      <MaterialIcons name="check-circle" size={14} color="#8a5d00" />
      <Text style={styles.visitedBadgeText}>Visita realizada</Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  visitedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    backgroundColor: '#fff4cc',
    zIndex: 10,
    boxShadow: [{
      offsetX: 0,
      offsetY: 6,
      blurRadius: 14,
      spreadDistance: 0,
      color: ' rgba(178, 132, 18, 0.18)',
    }]
  },
  visitedBadgeText: {
    color: '#8a5d00',
    fontSize: 12,
    fontWeight: '700',
  },
})