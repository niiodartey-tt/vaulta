import { View, Text, StyleSheet, ScrollView } from "react-native"
import { colors, typography } from "../styles/colors"
import { Button } from "../components/Button"
import { Card } from "../components/Card"

interface WalletScreenProps {
  navigation: any
}

export function WalletScreen({ navigation }: WalletScreenProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Wallet Management</Text>

        <Card style={styles.walletCard}>
          <Text style={styles.walletLabel}>Total Balance</Text>
          <Text style={styles.walletAmount}>$4,500.00</Text>
        </Card>

        <View style={styles.buttonContainer}>
          <Button title="Top Up Wallet" onPress={() => {}} style={styles.button} />
          <Button title="Withdraw Funds" onPress={() => {}} variant="outline" style={styles.button} />
        </View>

        <Card style={styles.historyCard}>
          <Text style={styles.historyTitle}>Recent Activity</Text>
          <Text style={styles.emptyState}>No transactions yet</Text>
        </Card>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  content: {
    padding: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: typography.sizes["2xl"],
    fontWeight: "bold",
    color: colors.neutral[900],
    marginBottom: 24,
  },
  walletCard: {
    backgroundColor: colors.primary,
    marginBottom: 24,
  },
  walletLabel: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.white,
    opacity: 0.8,
    marginBottom: 8,
  },
  walletAmount: {
    fontSize: typography.sizes["3xl"],
    fontWeight: "bold",
    color: colors.neutral.white,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 24,
  },
  button: {
    height: 48,
  },
  historyCard: {
    padding: 20,
  },
  historyTitle: {
    fontSize: typography.sizes.base,
    fontWeight: "600",
    color: colors.neutral[900],
    marginBottom: 16,
  },
  emptyState: {
    fontSize: typography.sizes.base,
    color: colors.neutral[400],
    textAlign: "center",
  },
})
