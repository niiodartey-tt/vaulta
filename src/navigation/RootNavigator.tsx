"use client"

import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useAuthStore } from "../store/authStore"
import { Text, StyleSheet, View } from "react-native"
import { colors } from "../styles/colors"

// Screens
import { SplashScreen } from "../screens/SplashScreen"
import { LoginScreen } from "../screens/LoginScreen"
import { SignUpScreen } from "../screens/SignUpScreen"
import { DashboardScreen } from "../screens/DashboardScreen"
import { WalletScreen } from "../screens/WalletScreen"
import { SettingsScreen } from "../screens/SettingsScreen"
import { ProfileScreen } from "../screens/ProfileScreen"
import { TransactionHistoryScreen } from "../screens/TransactionHistoryScreen"
import { DealsScreen } from "../screens/DealsScreen"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const iconMap: Record<string, string> = {
    Dashboard: "🏠",
    Deals: "💼",
    Wallet: "💰",
    Settings: "⚙️",
    Profile: "👤",
  }

  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, { color: focused ? colors.primary : colors.neutral[500] }]}>{iconMap[name]}</Text>
    </View>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutral[500],
        tabBarStyle: {
          backgroundColor: colors.neutral.white,
          borderTopColor: colors.neutral[200],
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarLabel: "Home" }} />
      <Tab.Screen name="Deals" component={DealsScreen} options={{ tabBarLabel: "Deals" }} />
      <Tab.Screen name="Wallet" component={WalletScreen} options={{ tabBarLabel: "Wallet" }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: "Settings" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: "Profile" }} />
    </Tab.Navigator>
  )
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
    </Stack.Navigator>
  )
}

export function RootNavigator() {
  const user = useAuthStore((state) => state.user)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate splash screen delay
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }

  return <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
  },
  tabIcon: {
    fontSize: 24,
  },
})
