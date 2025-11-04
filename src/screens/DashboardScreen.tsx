"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from "react-native"
import { colors, typography } from "../styles/colors"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { useAppStore } from "../store/appStore"

interface DashboardScreenProps {
  navigation: any
}

const mockTransactions = [
  {
    id: "ESC-45823",
    date: "Oct 28, 2025",
    amount: "$850.00",
    name: "MacBook Pro M3",
    counterparty: "Sarah Johnson",
    status: "In Escrow",
  },
  {
    id: "ESC-45822",
    date: "Oct 27, 2025",
    amount: "$1,200.00",
    name: "Web Development Service",
    counterparty: "James Miller",
    status: "Completed",
  },
  {
    id: "ESC-45821",
    date: "Oct 26, 2025",
    amount: "$450.00",
    name: "Gaming Console Bundle",
    counterparty: "Mike Davis",
    status: "In Progress",
  },
]

export function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { walletBalance, escrowBalance } = useAppStore()
  const [stats] = useState([
    { label: "Active", value: "2", color: "#1a73e8" },
    { label: "Completed", value: "8", color: "#34a853" },
    { label: "Dispute", value: "1", color: "#fbbc04" },
    { label: "Total", value: "11", color: "#9333ea" },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "#34a853"
      case "In Escrow":
        return "#1a73e8"
      case "In Progress":
        return "#fbbc04"
      case "Disputed":
        return "#ea4335"
      default:
        return "#6b7280"
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header with Balance */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>John Doe</Text>
        </View>
      </View>

      {/* Balance Section */}
      <Card style={styles.balanceCard}>
        <View style={styles.balanceRow}>
          <View>
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
            <Text style={styles.balanceAmount}>${walletBalance.toFixed(2)}</Text>
          </View>
          <View>
            <Text style={styles.balanceLabel}>Escrow Balance</Text>
            <Text style={styles.balanceAmount}>${escrowBalance.toFixed(2)}</Text>
          </View>
        </View>
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
          </Card>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button title="Top up Wallet" onPress={() => navigation.navigate("Wallet")} style={styles.actionButton} />
        <Button title="Withdraw" onPress={() => {}} variant="outline" style={styles.actionButton} />
      </View>

      {/* Recent Transactions */}
      <View style={styles.transactionsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => navigation.navigate("TransactionHistory")}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockTransactions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Card style={styles.transactionCard}>
              <View style={styles.transactionHeader}>
                <View>
                  <Text style={styles.transactionId}>{item.id}</Text>
                  <Text style={styles.transactionDate}>{item.date}</Text>
                </View>
                <Text style={[styles.transactionStatus, { color: getStatusColor(item.status) }]}>{item.status}</Text>
              </View>
              <View style={styles.transactionFooter}>
                <View>
                  <Text style={styles.transactionAmount}>{item.amount}</Text>
                  <Text style={styles.transactionName}>{item.name}</Text>
                </View>
              </View>
            </Card>
          )}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    paddingTop: 8,
  },
  greeting: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    marginBottom: 4,
  },
  name: {
    fontSize: typography.sizes["2xl"],
    fontWeight: "bold",
    color: colors.neutral[900],
  },
  balanceCard: {
    marginBottom: 24,
    backgroundColor: colors.primary,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceLabel: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.white,
    opacity: 0.8,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: typography.sizes.xl,
    fontWeight: "bold",
    color: colors.neutral.white,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: "48%",
    padding: 12,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[600],
    marginBottom: 8,
  },
  statValue: {
    fontSize: typography.sizes.xl,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    height: 48,
  },
  transactionsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: "600",
    color: colors.neutral[900],
    textTransform: "uppercase",
  },
  seeAll: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: "500",
  },
  transactionCard: {
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
  transactionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: typography.sizes.lg,
    fontWeight: "bold",
    color: colors.neutral[900],
    marginBottom: 4,
  },
  transactionName: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
  },
})
