import axios from "axios"

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

let authToken: string | null = null

export function setAuthToken(token: string) {
  authToken = token
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const api = {
  // Auth
  auth: {
    signup: (email: string, password: string, name: string, phone?: string) =>
      apiClient.post("/auth/signup", { email, password, name, phone }),
    login: (email: string, password: string) => apiClient.post("/auth/login", { email, password }),
    getMe: () => apiClient.get("/auth/me"),
  },

  // KYC
  kyc: {
    submit: (data: any) => apiClient.post("/kyc/submit", data),
    getStatus: () => apiClient.get("/kyc/status"),
  },

  // Wallet
  wallet: {
    getBalance: () => apiClient.get("/wallet/balance"),
    topupInitialize: (amount: number) => apiClient.post("/wallet/topup", { amount }),
    withdraw: (amount: number, bankAccountId: string) => apiClient.post("/wallet/withdraw", { amount, bankAccountId }),
  },

  // Deals
  deals: {
    create: (sellerId: string, itemName: string, amount: number, description?: string) =>
      apiClient.post("/deals/create", { sellerId, itemName, amount, description }),
    getMyDeals: () => apiClient.get("/deals/my-deals"),
    getDealById: (dealId: string) => apiClient.get(`/deals/${dealId}`),
    releaseFunds: (dealId: string) => apiClient.post(`/deals/${dealId}/release`),
  },

  // Messages
  messages: {
    send: (dealId: string, text: string) => apiClient.post("/messages/send", { dealId, text }),
    getDealMessages: (dealId: string) => apiClient.get(`/messages/deal/${dealId}`),
    markAsRead: (messageId: string) => apiClient.put(`/messages/${messageId}/read`),
  },

  // Transactions
  transactions: {
    getAll: () => apiClient.get("/transactions"),
    getById: (transactionId: string) => apiClient.get(`/transactions/${transactionId}`),
    create: (type: string, amount: number, description?: string) =>
      apiClient.post("/transactions/create", { type, amount, description }),
  },

  // Profile
  profile: {
    get: () => apiClient.get("/profile"),
    update: (data: any) => apiClient.put("/profile/update", data),
    changePassword: (currentPassword: string, newPassword: string) =>
      apiClient.post("/profile/change-password", { currentPassword, newPassword }),
  },

  // Listings
  listings: {
    getAll: (category?: string, search?: string) => apiClient.get("/listings", { params: { category, search } }),
    getMyListings: () => apiClient.get("/listings/my-listings"),
    create: (title: string, description: string, price: number, category?: string) =>
      apiClient.post("/listings/create", { title, description, price, category }),
    update: (listingId: string, data: any) => apiClient.put(`/listings/${listingId}`, data),
    delete: (listingId: string) => apiClient.delete(`/listings/${listingId}`),
  },

  // Payments (Paystack)
  payments: {
    initializeTopup: (amount: number) => apiClient.post("/payments/topup/initialize", { amount }),
    verifyTopup: (reference: string) => apiClient.post("/payments/topup/verify", { reference }),
    initializeWithdrawal: (amount: number, accountNumber: string, bankCode: string, accountName: string) =>
      apiClient.post("/payments/withdraw/initialize", { amount, accountNumber, bankCode, accountName }),
  },

  // Notifications
  notifications: {
    getAll: () => apiClient.get("/notifications"),
    markAsRead: (notificationId: string) => apiClient.put(`/notifications/${notificationId}/read`),
  },
}
