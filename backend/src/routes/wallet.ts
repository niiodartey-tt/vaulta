import { Router, type Response } from "express"
import { query } from "../config/database"
import { authMiddleware, type AuthRequest } from "../middleware/auth"

const router = Router()

// Get Balance
router.get("/balance", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query("SELECT wallet_balance, escrow_balance FROM users WHERE id = $1", [req.userId])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch balance" })
  }
})

// Top Up Wallet (via Paystack)
router.post("/topup", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { amount } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" })
    }

    // TODO: Integrate with Paystack API

    res.json({ message: "Payment initiated", amount })
  } catch (error) {
    res.status(500).json({ error: "Top up failed" })
  }
})

// Withdraw Funds
router.post("/withdraw", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { amount, bankAccountId } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" })
    }

    // Check balance
    const userResult = await query("SELECT wallet_balance FROM users WHERE id = $1", [req.userId])

    if (userResult.rows[0].wallet_balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" })
    }

    // Deduct from wallet
    await query("UPDATE users SET wallet_balance = wallet_balance - $1 WHERE id = $2", [amount, req.userId])

    // Create transaction record
    const transactionResult = await query(
      "INSERT INTO transactions (user_id, type, amount, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.userId, "withdrawal", amount, "completed"],
    )

    res.json(transactionResult.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Withdrawal failed" })
  }
})

export default router
