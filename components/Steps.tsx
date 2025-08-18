import { StyleSheet, Text, View } from "react-native";

type StepsProps = {
  current: number;
  length?: number;
}
export default function Steps({length = 3 , current = 0}: StepsProps) {
  return (
    <View style={styles.stepIndicator}>
      {Array(length).fill(null).map((_, step) => (
        <View
          key={step}
          style={[styles.stepCircle, current === step && styles.activeStep]}
        >
          <Text style={styles.stepText}>{step + 1}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  activeStep: {
    backgroundColor: '#0b5e4f',
  },
  stepText: {
    color: 'white',
    fontWeight: 'bold',
  },
})