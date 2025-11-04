import { Router, type Response } from "express"
import { query } from "../config/database"
import { authMiddleware, type AuthRequest } from "../middleware/auth"
import { initializePayment, verifyPayment, createTransferRecipient, initiateTransfer } from "../utils/paystack"

const router = Router()

// Initialize Top Up Payment
router.post("/topup/initialize", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { amount } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" })
    }

    const userResult = await query("SELECT email FROM users WHERE id = $1", [req.userId])
    const user = userResult.rows[0]

    const reference = `topup-${req.userId}-${Date.now()}`
    const paymentData = await initializePayment(user.email, amount, reference)

    // Store pending transaction
    await query("INSERT INTO transactions (user_id, type, amount, status, description) VALUES ($1, $2, $3, $4, $5)", [
      req.userId,
      "topup",
      amount,
      "pending",
      reference,
    ])

    res.json(paymentData)
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Payment initialization failed" })
  }
})

// Verify Top Up Payment
router.post("/topup/verify", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { reference } = req.body

    const paymentData = await verifyPayment(reference)

    if (paymentData.status === "success") {
      // Get amount from transaction
      const txResult = await query("SELECT amount FROM transactions WHERE description = $1 LIMIT 1", [reference])

      if (txResult.rows.length > 0) {
        const amount = txResult.rows[0].amount

        // Update wallet balance
        await query("UPDATE users SET wallet_balance = wallet_balance + $1 WHERE id = $2", [amount, req.userId])

        // Update transaction status
        await query("UPDATE transactions SET status = $1 WHERE description = $2", ["completed", reference])
      }

      res.json({ message: "Payment verified and wallet updated", data: paymentData })
    } else {
      res.status(400).json({ error: "Payment verification failed" })
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Payment verification failed" })
  }
})

// Initialize Withdrawal
router.post("/withdraw/initialize", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { amount, accountNumber, bankCode, accountName } = req.body

    if (!amount || !accountNumber || !bankCode) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Check balance
    const userResult = await query("SELECT wallet_balance FROM users WHERE id = $1", [req.userId])

    if (userResult.rows[0].wallet_balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" })
    }

    // Create transfer recipient
    const recipient = await createTransferRecipient(accountNumber, bankCode, accountName)

    // Initiate transfer
    const transfer = await initiateTransfer(recipient.recipient_code, amount, "Wallet withdrawal")

    // Deduct from wallet
    await query("UPDATE users SET wallet_balance = wallet_balance - $1 WHERE id = $2", [amount, req.userId])

    // Create transaction record
    await query("INSERT INTO transactions (user_id, type, amount, status, description) VALUES ($1, $2, $3, $4, $5)", [
      req.userId,
      "withdrawal",
      amount,
      "processing",
      `Transfer ${transfer.transfer_code}`,
    ])

    res.json(transfer)
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Withdrawal initialization failed" })
  }
})

export default router
