export interface Transaction {
  id: string
  date: string
  amount: string
  name: string
  counterparty: string
  status: "In Escrow" | "Completed" | "In Progress" | "Disputed"
  role: "buyer" | "seller"
  category: string
  description: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  kycStatus: "pending" | "under-review" | "verified" | "rejected"
  wallet_balance: number
  escrow_balance: number
  created_at: string
}

export interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  type: "transaction" | "system" | "security"
}

export interface AppState {
  user: User | null
  walletBalance: number
  escrowBalance: number
  transactions: Transaction[]
  notifications: Notification[]
}

export interface KYCData {
  firstName: string
  lastName: string
  dateOfBirth: string
  idType: string
  idNumber: string
  address: string
  city: string
  country: string
}

export interface EscrowDeal {
  id: string
  buyer_id: string
  seller_id: string
  item_name: string
  amount: number
  status: "pending" | "in_escrow" | "released" | "disputed"
  created_at: string
  completed_at?: string
}

export interface Message {
  id: string
  deal_id: string
  sender_id: string
  text: string
  timestamp: string
  read: boolean
}
