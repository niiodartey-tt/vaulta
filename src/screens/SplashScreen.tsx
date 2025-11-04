import { View, Text, StyleSheet } from "react-native"
import { colors, typography } from "../styles/colors"

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escrow App</Text>
      <Text style={styles.subtitle}>Secure Transactions Made Easy</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: typography.sizes["3xl"],
    fontWeight: "bold",
    color: colors.neutral.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.neutral.white,
    opacity: 0.8,
  },
})
