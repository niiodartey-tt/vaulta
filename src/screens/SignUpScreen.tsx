"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import { colors, typography } from "../styles/colors"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useAuthStore } from "../store/authStore"

interface SignUpScreenProps {
  navigation: any
}

export function SignUpScreen({ navigation }: SignUpScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const signup = useAuthStore((state) => state.signup)

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      await signup(email, password)
      navigation.replace("MainTabs")
    } catch (error) {
      alert("Sign up failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSubtitle}>Sign up to get started</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Input
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={!loading}
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            containerStyle={styles.inputMargin}
          />

          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
            containerStyle={styles.inputMargin}
          />

          <Button
            title={loading ? "Creating..." : "Sign Up"}
            onPress={handleSignUp}
            disabled={loading}
            style={styles.signUpButton}
          />
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: typography.sizes["2xl"],
    fontWeight: "bold",
    color: colors.neutral[900],
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: typography.sizes.base,
    color: colors.neutral[600],
  },
  formContainer: {
    marginBottom: 24,
  },
  inputMargin: {
    marginTop: 16,
  },
  signUpButton: {
    marginTop: 24,
    height: 48,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  loginText: {
    fontSize: typography.sizes.base,
    color: colors.neutral[600],
  },
  loginLink: {
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: "600",
  },
})
