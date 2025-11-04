import { View, Text, StyleSheet, ScrollView } from "react-native"
import { colors, typography } from "../styles/colors"
import { Card } from "../components/Card"

interface DealsScreenProps {
  navigation: any
}

export function DealsScreen({ navigation }: DealsScreenProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Deals</Text>

        <Card style={styles.emptyState}>
          <Text style={styles.emptyText}>No active deals</Text>
          <Text style={styles.emptySubtext}>Create a new transaction to get started</Text>
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
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: typography.sizes.lg,
    fontWeight: "600",
    color: colors.neutral[900],
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[400],
  },
})
