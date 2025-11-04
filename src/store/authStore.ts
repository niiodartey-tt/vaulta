import { create } from "zustand"
import { api, setAuthToken } from "../services/api"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface AuthState {
  user: any | null
  isLoading: boolean
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signup: (email: string, password: string, name: string, phone?: string) => Promise<void>
  restoreToken: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  token: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const response = await api.auth.login(email, password)
      const { token, user } = response.data

      await AsyncStorage.setItem("authToken", token)
      setAuthToken(token)

      set({ user, token, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  signup: async (email: string, password: string, name: string, phone?: string) => {
    set({ isLoading: true })
    try {
      const response = await api.auth.signup(email, password, name, phone)
      const { token, user } = response.data

      await AsyncStorage.setItem("authToken", token)
      setAuthToken(token)

      set({ user, token, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("authToken")
      set({ user: null, token: null })
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  },

  restoreToken: async () => {
    try {
      const token = await AsyncStorage.getItem("authToken")
      if (token) {
        setAuthToken(token)
        const response = await api.auth.getMe()
        set({ user: response.data, token })
      }
    } catch (error) {
      console.error("[v0] Token restore error:", error)
    }
  },
}))
