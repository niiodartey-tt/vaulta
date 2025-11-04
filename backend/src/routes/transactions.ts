import { Router, type Response } from "express"
import { query } from "../config/database"
import { authMiddleware, type AuthRequest } from "../middleware/auth"

const router = Router()

// Get All User Transactions
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query("SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50", [
      req.userId,
    ])

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" })
  }
})

// Get Transaction Details
router.get("/:transactionId", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { transactionId } = req.params

    const result = await query("SELECT * FROM transactions WHERE id = $1 AND user_id = $2", [transactionId, req.userId])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" })
    }

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transaction" })
  }
})

// Create Transaction
router.post("/create", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { type, amount, description } = req.body

    if (!type || !amount) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const result = await query(
      "INSERT INTO transactions (user_id, type, amount, status, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.userId, type, amount, "pending", description || null],
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" })
  }
})

export default router
