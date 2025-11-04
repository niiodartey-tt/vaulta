import { Router, type Response } from "express"
import { query } from "../config/database"
import { authMiddleware, type AuthRequest } from "../middleware/auth"

const router = Router()

// Create Escrow Deal
router.post("/create", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { sellerId, itemName, amount, description } = req.body

    const result = await query(
      `INSERT INTO escrow_deals (buyer_id, seller_id, item_name, amount, description, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.userId, sellerId, itemName, amount, description, "pending"],
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to create deal" })
  }
})

// Get User's Deals
router.get("/my-deals", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT * FROM escrow_deals WHERE buyer_id = $1 OR seller_id = $1 ORDER BY created_at DESC`,
      [req.userId],
    )

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch deals" })
  }
})

// Get Deal Details
router.get("/:dealId", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { dealId } = req.params

    const result = await query("SELECT * FROM escrow_deals WHERE id = $1", [dealId])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Deal not found" })
    }

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch deal" })
  }
})

// Release Escrow
router.post("/:dealId/release", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { dealId } = req.params

    const dealResult = await query("SELECT * FROM escrow_deals WHERE id = $1", [dealId])

    if (dealResult.rows.length === 0) {
      return res.status(404).json({ error: "Deal not found" })
    }

    const deal = dealResult.rows[0]

    // Transfer funds to seller
    await query("UPDATE users SET wallet_balance = wallet_balance + $1 WHERE id = $2", [deal.amount, deal.seller_id])

    // Update deal status
    const result = await query("UPDATE escrow_deals SET status = $1, completed_at = NOW() WHERE id = $2 RETURNING *", [
      "released",
      dealId,
    ])

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to release escrow" })
  }
})

export default router
