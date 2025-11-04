"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { colors, typography } from "../styles/colors"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Card } from "../components/Card"

interface FundWalletScreenProps {
  navigation: any
}

const PAYMENT_METHODS = [
  { id: "mtn", name: "MTN Mobile Money", icon: "📱", fee: 0.99 },
  { id: "vodafone", name: "Vodafone Cash", icon: "💳", fee: 0.99 },
  { id: "airtel", name: "AirtelTigo Money", icon: "📲", fee: 1.49 },
  { id: "bank", name: "Bank Transfer", icon: "🏦", fee: 0 },
]

const PRESET_AMOUNTS = [100, 500, 1000, 2000]

export function FundWalletScreen({ navigation }: FundWalletScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState("mtn")
  const [customAmount, setCustomAmount] = useState("")
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const finalAmount = selectedPreset || (customAmount ? Number.parseFloat(customAmount) : 0)
  const selectedPaymentMethod = PAYMENT_METHODS.find((m) => m.id === selectedMethod)
  const fee = selectedPaymentMethod?.fee || 0
  const total = finalAmount + fee

  const handleFund = async () => {
    if (!finalAmount) {
      alert("Please enter an amount")
      return
    }

    setLoading(true)
    try {
      // TODO: Call backend API to initiate payment
      alert(`Processing ₵${total.toFixed(2)} payment...`)
      setLoading(false)
    } catch (error) {
      alert("Payment processing failed")
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Fund Your Wallet</Text>

      {/* Current Balance Card */}
      <Card style={[styles.balanceCard, { backgroundColor: colors.primary }]}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>₵1,250.00</Text>
      </Card>

      {/* Preset Amounts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Amount</Text>
        <View style={styles.presetGrid}>
          {PRESET_AMOUNTS.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[styles.presetButton, selectedPreset === amount && styles.presetButtonActive]}
              onPress={() => {
                setSelectedPreset(amount)
                setCustomAmount("")
              }}
            >
              <Text style={[styles.presetButtonText, selectedPreset === amount && styles.presetButtonTextActive]}>
                ₵{amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Custom Amount */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Amount</Text>
        <Input
          placeholder="Enter amount"
          value={customAmount}
          onChangeText={(text) => {
            setCustomAmount(text)
            setSelectedPreset(null)
          }}
          keyboardType="decimal-pad"
        />
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {PAYMENT_METHODS.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[styles.methodCard, selectedMethod === method.id && styles.methodCardActive]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <Text style={styles.methodIcon}>{method.icon}</Text>
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>{method.name}</Text>
              <Text style={styles.methodFee}>Fee: ₵{method.fee.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary */}
      {finalAmount > 0 && (
        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount:</Text>
            <Text style={styles.summaryValue}>₵{finalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Fee:</Text>
            <Text style={styles.summaryValue}>₵{fee.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.summaryLabelBold}>Total:</Text>
            <Text style={styles.summaryValueBold}>₵{total.toFixed(2)}</Text>
          </View>
        </Card>
      )}

      <Button
        title={loading ? "Processing..." : "Proceed to Payment"}
        onPress={handleFund}
        disabled={!finalAmount || loading}
        style={styles.fundButton}
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
  presetGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  presetButton: {
    width: "23%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 8,
    alignItems: "center",
  },
  presetButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  presetButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: "600",
    color: colors.neutral[700],
  },
  presetButtonTextActive: {
    color: colors.neutral.white,
  },
  methodCard: {
    flexDirection: "row",
    padding: 16,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  methodCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: typography.sizes.sm,
    fontWeight: "600",
    color: colors.neutral[900],
  },
  methodFee: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[600],
    marginTop: 2,
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
  fundButton: {
    marginBottom: 40,
    height: 48,
  },
})
