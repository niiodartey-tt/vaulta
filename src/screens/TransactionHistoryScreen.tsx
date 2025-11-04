import { View, Text, StyleSheet, FlatList } from "react-native"
import { colors, typography } from "../styles/colors"
import { Card } from "../components/Card"

interface TransactionHistoryScreenProps {
  navigation: any
}

const mockTransactions = [
  {
    id: "ESC-45823",
    date: "Oct 28, 2025",
    amount: "$850.00",
    name: "MacBook Pro M3",
    status: "In Escrow",
  },
  {
    id: "ESC-45822",
    date: "Oct 27, 2025",
    amount: "$1,200.00",
    name: "Web Development Service",
    status: "Completed",
  },
  {
    id: "ESC-45821",
    date: "Oct 26, 2025",
    amount: "$450.00",
    name: "Gaming Console Bundle",
    status: "In Progress",
  },
  {
    id: "ESC-45820",
    date: "Oct 25, 2025",
    amount: "$2,500.00",
    name: "Graphic Design Package",
    status: "Completed",
  },
]

export function TransactionHistoryScreen({ navigation }: TransactionHistoryScreenProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return colors.success
      case "In Escrow":
        return colors.secondary
      case "In Progress":
        return colors.warning
      default:
        return colors.neutral[600]
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>

      <FlatList
        data={mockTransactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <View>
                <Text style={styles.transactionId}>{item.id}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text style={[styles.transactionStatus, { color: getStatusColor(item.status) }]}>{item.status}</Text>
            </View>
            <View style={styles.transactionBody}>
              <Text style={styles.transactionAmount}>{item.amount}</Text>
              <Text style={styles.transactionName}>{item.name}</Text>
            </View>
          </Card>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: typography.sizes["2xl"],
    fontWeight: "bold",
    color: colors.neutral[900],
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  transactionCard: {
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  transactionId: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[600],
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[400],
  },
  transactionStatus: {
    fontSize: typography.sizes.xs,
    fontWeight: "600",
  },
  transactionBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: typography.sizes.lg,
    fontWeight: "bold",
    color: colors.neutral[900],
  },
  transactionName: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
  },
})
