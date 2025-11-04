"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import { colors, typography } from "../styles/colors"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useAuthStore } from "../store/authStore"

interface LoginScreenProps {
  navigation: any
}

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const login = useAuthStore((state) => state.login)

  const handleLogin = async () => {
    setLoading(true)
    try {
      await login(identifier, password)
      navigation.replace("MainTabs")
    } catch (error) {
      alert("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome Back</Text>
          <Text style={styles.headerSubtitle}>Sign in to continue</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Input
            placeholder="Email or Username"
            value={identifier}
            onChangeText={setIdentifier}
            keyboardType="email-address"
            editable={!loading}
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!loading}
            containerStyle={styles.inputMargin}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>{showPassword ? "Hide" : "Show"} Password</Text>
          </TouchableOpacity>

          <Button
            title={loading ? "Signing in..." : "Sign In"}
            onPress={handleLogin}
            disabled={loading}
            style={styles.loginButton}
          />
        </View>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpLink}>Sign Up</Text>
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
  forgotPassword: {
    marginTop: 12,
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: "500",
  },
  loginButton: {
    marginTop: 24,
    height: 48,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  signUpText: {
    fontSize: typography.sizes.base,
    color: colors.neutral[600],
  },
  signUpLink: {
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: "600",
  },
})
