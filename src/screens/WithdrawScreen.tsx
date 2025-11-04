"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { colors, typography } from "../styles/colors"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Card } from "../components/Card"

interface WithdrawScreenProps {
  navigation: any
}

const BANK_ACCOUNTS = [
  { id: "1", name: "Ghana National Bank", accountNumber: "****1234", type: "primary" },
  { id: "2", name: "Ecobank", accountNumber: "****5678", type: "secondary" },
]

export function WithdrawScreen({ navigation }: WithdrawScreenProps) {
  const [amount, setAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("1")
  const [loading, setLoading] = useState(false)

  const handleWithdraw = async () => {
    if (!amount) {
      alert("Please enter an amount")
      return
    }

    setLoading(true)
    try {
      // TODO: Call backend API to process withdrawal
      alert(`Withdrawal of ₵${amount} initiated to selected account.`)
      setAmount("")
      setLoading(false)
    } catch (error) {
      alert("Withdrawal failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Withdraw Funds</Text>

      {/* Available Balance */}
      <Card style={[styles.balanceCard, { backgroundColor: colors.primary }]}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>₵2,500.00</Text>
      </Card>

      {/* Amount Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Withdrawal Amount</Text>
        <Input placeholder="Enter amount" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" />
        <Text style={styles.feeNote}>Withdrawal fee: ₵2.50</Text>
      </View>

      {/* Bank Account Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Bank Account</Text>
        {BANK_ACCOUNTS.map((account) => (
          <TouchableOpacity
            key={account.id}
            style={[styles.accountCard, selectedAccount === account.id && styles.accountCardActive]}
            onPress={() => setSelectedAccount(account.id)}
          >
            <View>
              <Text style={styles.accountName}>{account.name}</Text>
              <Text style={styles.accountNumber}>{account.accountNumber}</Text>
            </View>
            <View style={[styles.radioButton, selectedAccount === account.id && styles.radioButtonActive]} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary */}
      {amount && (
        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount:</Text>
            <Text style={styles.summaryValue}>₵{Number.parseFloat(amount).toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Fee:</Text>
            <Text style={styles.summaryValue}>₵2.50</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.summaryLabelBold}>Total:</Text>
            <Text style={styles.summaryValueBold}>₵{(Number.parseFloat(amount) + 2.5).toFixed(2)}</Text>
          </View>
        </Card>
      )}

      <Button
        title={loading ? "Processing..." : "Confirm Withdrawal"}
        onPress={handleWithdraw}
        disabled={!amount || loading}
        style={styles.withdrawButton}
      />
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
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: "bold",
    color: colors.neutral[900],
    marginBottom: 16,
  },
  balanceCard: {
    marginBottom: 24,
    padding: 20,
  },
  balanceLabel: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: typography.sizes["2xl"],
    fontWeight: "bold",
    color: colors.neutral.white,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: "600",
    color: colors.neutral[900],
    marginBottom: 12,
  },
  feeNote: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
    marginTop: 8,
  },
  accountCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 8,
    marginBottom: 12,
  },
  accountCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  accountName: {
    fontSize: typography.sizes.sm,
    fontWeight: "600",
    color: colors.neutral[900],
  },
  accountNumber: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[600],
    marginTop: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.neutral[300],
  },
  radioButtonActive: {
    backgroundColor: colors.neutral.white,
    borderColor: colors.neutral.white,
  },
  summaryCard: {
    marginBottom: 20,
    paddingVertical: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    marginTop: 4,
  },
  summaryLabel: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
  },
  summaryLabelBold: {
    fontSize: typography.sizes.base,
    fontWeight: "bold",
    color: colors.neutral[900],
  },
  summaryValue: {
    fontSize: typography.sizes.sm,
    fontWeight: "600",
    color: colors.neutral[900],
  },
  summaryValueBold: {
    fontSize: typography.sizes.base,
    fontWeight: "bold",
    color: colors.primary,
  },
  withdrawButton: {
    marginBottom: 40,
    height: 48,
  },
})
