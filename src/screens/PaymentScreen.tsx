"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Alert, Linking } from "react-native"
import { colors, typography } from "../styles/colors"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Card } from "../components/Card"
import { api } from "../services/api"

interface PaymentScreenProps {
  navigation: any
  route: any
}

export function PaymentScreen({ navigation, route }: PaymentScreenProps) {
  const { amount, type } = route.params || { amount: 100, type: "topup" }
  const [loading, setLoading] = useState(false)
  const [accountDetails, setAccountDetails] = useState({
    accountNumber: "",
    bankCode: "",
    accountName: "",
  })

  const handlePaystackPayment = async () => {
    if (!amount || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount")
      return
    }

    setLoading(true)
    try {
      const response = await api.payments.initializeTopup(amount)

      if (response.data.authorization_url) {
        // Open Paystack authorization URL
        await Linking.openURL(response.data.authorization_url)

        // After user completes payment, verify it
        setTimeout(() => verifyPayment(response.data.reference), 3000)
      }
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.error || "Payment initialization failed")
    } finally {
      setLoading(false)
    }
  }

  const verifyPayment = async (reference: string) => {
    try {
      const response = await api.payments.verifyTopup(reference)
      Alert.alert("Success", "Payment verified! Your wallet has been updated.")
      navigation.goBack()
    } catch (error: any) {
      Alert.alert("Error", "Payment verification failed")
    }
  }

  const handleWithdrawal = async () => {
    if (!amount || !accountDetails.accountNumber || !accountDetails.bankCode) {
      Alert.alert("Error", "Please fill in all details")
      return
    }

    setLoading(true)
    try {
      const response = await api.payments.initializeWithdrawal(
        amount,
        accountDetails.accountNumber,
        accountDetails.bankCode,
        accountDetails.accountName,
      )

      Alert.alert("Success", `Withdrawal initiated. Transfer code: ${response.data.transfer_code}`)
      navigation.goBack()
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.error || "Withdrawal failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{type === "topup" ? "Fund Wallet" : "Withdraw Funds"}</Text>

      {type === "topup" ? (
        <View>
          <Card style={[styles.card, { backgroundColor: colors.primary }]}>
            <Text style={styles.amountLabel}>Amount to Add</Text>
            <Text style={styles.amount}>₵{amount.toFixed(2)}</Text>
          </Card>

          <Card style={styles.infoCard}>
            <Text style={styles.infoTitle}>How It Works</Text>
            <Text style={styles.infoText}>1. Click "Pay with Paystack" below</Text>
            <Text style={styles.infoText}>2. You'll be redirected to Paystack</Text>
            <Text style={styles.infoText}>3. Complete the payment with your preferred method</Text>
            <Text style={styles.infoText}>4. Your wallet will be updated automatically</Text>
          </Card>

          <Button
            title={loading ? "Processing..." : "Pay with Paystack"}
            onPress={handlePaystackPayment}
            disabled={loading}
            style={styles.button}
          />
        </View>
      ) : (
        <View>
          <Card style={styles.card}>
            <Text style={styles.fieldLabel}>Amount</Text>
            <Input
              placeholder="Amount to withdraw"
              value={amount.toString()}
              editable={false}
              containerStyle={{ marginBottom: 0 }}
            />

            <Text style={styles.fieldLabel}>Account Number</Text>
            <Input
              placeholder="Enter account number"
              value={accountDetails.accountNumber}
              onChangeText={(text) => setAccountDetails({ ...accountDetails, accountNumber: text })}
              containerStyle={{ marginBottom: 12 }}
            />

            <Text style={styles.fieldLabel}>Bank Code</Text>
            <Input
              placeholder="Enter bank code"
              value={accountDetails.bankCode}
              onChangeText={(text) => setAccountDetails({ ...accountDetails, bankCode: text })}
              containerStyle={{ marginBottom: 12 }}
            />

            <Text style={styles.fieldLabel}>Account Name</Text>
            <Input
              placeholder="Account holder name"
              value={accountDetails.accountName}
              onChangeText={(text) => setAccountDetails({ ...accountDetails, accountName: text })}
              containerStyle={{ marginBottom: 0 }}
            />
          </Card>

          <Button
            title={loading ? "Processing..." : "Confirm Withdrawal"}
            onPress={handleWithdrawal}
            disabled={loading}
            style={styles.button}
          />
        </View>
      )}
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
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
    padding: 20,
  },
  amountLabel: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  amount: {
    fontSize: typography.sizes["3xl"],
    fontWeight: "bold",
    color: colors.neutral.white,
  },
  infoCard: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: typography.sizes.base,
    fontWeight: "bold",
    color: colors.neutral[900],
    marginBottom: 12,
  },
  infoText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: "600",
    color: colors.neutral[900],
    marginBottom: 8,
    marginTop: 12,
  },
  button: {
    height: 48,
    marginTop: 20,
    marginBottom: 40,
  },
})
