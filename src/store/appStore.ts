import { create } from "zustand"
import { api } from "../services/api"
import { initializeWebSocket, onNotification, onDealUpdated } from "../services/websocket"

interface AppStoreState {
  walletBalance: number
  escrowBalance: number
  transactions: any[]
  deals: any[]
  notifications: any[]
  listings: any[]
  isLoadingBalance: boolean
  isLoadingTransactions: boolean
  isLoadingDeals: boolean
  fetchBalance: () => Promise<void>
  fetchTransactions: () => Promise<void>
  fetchDeals: () => Promise<void>
  fetchListings: (category?: string, search?: string) => Promise<void>
  fetchNotifications: () => Promise<void>
  updateWalletBalance: (amount: number) => void
  updateEscrowBalance: (amount: number) => void
  addNotification: (notification: any) => void
  addDeal: (deal: any) => void
}

export const useAppStore = create<AppStoreState>((set, get) => {
  // Setup WebSocket listeners
  initializeWebSocket()

  onNotification((data) => {
    get().addNotification(data)
  })

  onDealUpdated((data) => {
    get().fetchDeals()
  })

  return {
    walletBalance: 0,
    escrowBalance: 0,
    transactions: [],
    deals: [],
    notifications: [],
    listings: [],
    isLoadingBalance: false,
    isLoadingTransactions: false,
    isLoadingDeals: false,

    fetchBalance: async () => {
      set({ isLoadingBalance: true })
      try {
        const response = await api.wallet.getBalance()
        set({
          walletBalance: response.data.wallet_balance,
          escrowBalance: response.data.escrow_balance,
          isLoadingBalance: false,
        })
      } catch (error) {
        console.error("[v0] Failed to fetch balance:", error)
        set({ isLoadingBalance: false })
      }
    },

    fetchTransactions: async () => {
      set({ isLoadingTransactions: true })
      try {
        const response = await api.transactions.getAll()
        set({ transactions: response.data, isLoadingTransactions: false })
      } catch (error) {
        console.error("[v0] Failed to fetch transactions:", error)
        set({ isLoadingTransactions: false })
      }
    },

    fetchDeals: async () => {
      set({ isLoadingDeals: true })
      try {
        const response = await api.deals.getMyDeals()
        set({ deals: response.data, isLoadingDeals: false })
      } catch (error) {
        console.error("[v0] Failed to fetch deals:", error)
        set({ isLoadingDeals: false })
      }
    },

    fetchListings: async (category?: string, search?: string) => {
      try {
        const response = await api.listings.getAll(category, search)
        set({ listings: response.data })
      } catch (error) {
        console.error("[v0] Failed to fetch listings:", error)
      }
    },

    fetchNotifications: async () => {
      try {
        const response = await api.notifications.getAll()
        set({ notifications: response.data })
      } catch (error) {
        console.error("[v0] Failed to fetch notifications:", error)
      }
    },

    updateWalletBalance: (amount: number) => set({ walletBalance: amount }),
    updateEscrowBalance: (amount: number) => set({ escrowBalance: amount }),
    addNotification: (notification: any) =>
      set((state) => ({
        notifications: [notification, ...state.notifications],
      })),
    addDeal: (deal: any) =>
      set((state) => ({
        deals: [deal, ...state.deals],
      })),
  }
})
