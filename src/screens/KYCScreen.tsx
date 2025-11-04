"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { colors, typography } from "../styles/colors"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Card } from "../components/Card"

interface KYCScreenProps {
  navigation: any
}

export function KYCScreen({ navigation }: KYCScreenProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idType: "national",
    idNumber: "",
    dateOfBirth: "",
    address: "",
    city: "",
    country: "Ghana",
  })

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
    else navigation.goBack()
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.stepTitle}>Personal Information</Text>
            <Input
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => updateFormData("firstName", text)}
              containerStyle={styles.input}
            />
            <Input
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => updateFormData("lastName", text)}
              containerStyle={styles.input}
            />
            <Input
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={formData.dateOfBirth}
              onChangeText={(text) => updateFormData("dateOfBirth", text)}
              containerStyle={styles.input}
            />
          </View>
        )
      case 2:
        return (
          <View>
            <Text style={styles.stepTitle}>Identity Verification</Text>
            <View style={styles.idTypeContainer}>
              {["national", "passport", "driver"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.idTypeButton, formData.idType === type && styles.idTypeButtonActive]}
                  onPress={() => updateFormData("idType", type)}
                >
                  <Text style={[styles.idTypeButtonText, formData.idType === type && styles.idTypeButtonTextActive]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Input
              placeholder="ID Number"
              value={formData.idNumber}
              onChangeText={(text) => updateFormData("idNumber", text)}
              containerStyle={styles.input}
            />
          </View>
        )
      case 3:
        return (
          <View>
            <Text style={styles.stepTitle}>Address Information</Text>
            <Input
              placeholder="Street Address"
              value={formData.address}
              onChangeText={(text) => updateFormData("address", text)}
              containerStyle={styles.input}
            />
            <Input
              placeholder="City"
              value={formData.city}
              onChangeText={(text) => updateFormData("city", text)}
              containerStyle={styles.input}
            />
            <Input placeholder="Country" value={formData.country} editable={false} containerStyle={styles.input} />
          </View>
        )
      case 4:
        return (
          <View>
            <Text style={styles.stepTitle}>Review & Confirm</Text>
            <Card style={styles.reviewCard}>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Name:</Text>
                <Text style={styles.reviewValue}>
                  {formData.firstName} {formData.lastName}
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>ID Type:</Text>
                <Text style={styles.reviewValue}>{formData.idType}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Address:</Text>
                <Text style={styles.reviewValue}>
                  {formData.address}, {formData.city}
                </Text>
              </View>
            </Card>
            <Text style={styles.confirmText}>
              By confirming, you agree that all information provided is accurate and true.
            </Text>
          </View>
        )
      default:
        return null
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.progressBar}>
        {[1, 2, 3, 4].map((s) => (
          <View key={s} style={[styles.progressStep, s <= step && styles.progressStepActive]} />
        ))}
      </View>

      <Text style={styles.stepCounter}>Step {step} of 4</Text>

      {renderStep()}

      <View style={styles.buttonContainer}>
        <Button title="Back" variant="outline" onPress={handleBack} disabled={step === 1} style={styles.button} />
        <Button title={step === 4 ? "Verify" : "Next"} onPress={handleNext} style={styles.button} />
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
  },
  progressBar: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: colors.neutral[200],
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: colors.primary,
  },
  stepCounter: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: "600",
    color: colors.neutral[900],
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  idTypeContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  idTypeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 8,
    alignItems: "center",
  },
  idTypeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  idTypeButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[700],
    fontWeight: "500",
  },
  idTypeButtonTextActive: {
    color: colors.neutral.white,
  },
  reviewCard: {
    marginVertical: 16,
  },
  reviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  reviewLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: "600",
    color: colors.neutral[600],
  },
  reviewValue: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[900],
  },
  confirmText: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
    textAlign: "center",
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    height: 48,
  },
})
