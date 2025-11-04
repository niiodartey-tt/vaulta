import axios from "axios"
import { config } from "../config/env"

const paystackClient = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
  },
})

export async function initializePayment(email: string, amount: number, reference: string) {
  try {
    const response = await paystackClient.post("/transaction/initialize", {
      email,
      amount: amount * 100, // Paystack uses cents
      reference,
    })

    return response.data.data
  } catch (error) {
    throw new Error("Failed to initialize payment")
  }
}

export async function verifyPayment(reference: string) {
  try {
    const response = await paystackClient.get(`/transaction/verify/${reference}`)

    return response.data.data
  } catch (error) {
    throw new Error("Failed to verify payment")
  }
}

export async function createTransferRecipient(accountNumber: string, bankCode: string, name: string) {
  try {
    const response = await paystackClient.post("/transferrecipient", {
      type: "nuban",
      account_number: accountNumber,
      bank_code: bankCode,
      name,
    })

    return response.data.data
  } catch (error) {
    throw new Error("Failed to create transfer recipient")
  }
}

export async function initiateTransfer(recipientCode: string, amount: number, reason: string) {
  try {
    const response = await paystackClient.post("/transfer", {
      source: "balance",
      recipient: recipientCode,
      amount: amount * 100,
      reason,
    })

    return response.data.data
  } catch (error) {
    throw new Error("Failed to initiate transfer")
  }
}
