import { Router, type Response } from "express"
import { query } from "../config/database"
import { authMiddleware, type AuthRequest } from "../middleware/auth"

const router = Router()

// Send Message
router.post("/send", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { dealId, text } = req.body

    if (!dealId || !text) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Verify user is part of the deal
    const dealResult = await query("SELECT * FROM escrow_deals WHERE id = $1 AND (buyer_id = $2 OR seller_id = $2)", [
      dealId,
      req.userId,
    ])

    if (dealResult.rows.length === 0) {
      return res.status(403).json({ error: "Unauthorized access to this deal" })
    }

    const result = await query("INSERT INTO messages (deal_id, sender_id, text) VALUES ($1, $2, $3) RETURNING *", [
      dealId,
      req.userId,
      text,
    ])

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" })
  }
})

// Get Messages for Deal
router.get("/deal/:dealId", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { dealId } = req.params

    // Verify access
    const dealResult = await query("SELECT * FROM escrow_deals WHERE id = $1 AND (buyer_id = $2 OR seller_id = $2)", [
      dealId,
      req.userId,
    ])

    if (dealResult.rows.length === 0) {
      return res.status(403).json({ error: "Unauthorized access to this deal" })
    }

    const result = await query(
      "SELECT m.*, u.name as sender_name FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.deal_id = $1 ORDER BY m.created_at ASC",
      [dealId],
    )

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" })
  }
})

// Mark Message as Read
router.put("/:messageId/read", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { messageId } = req.params

    const result = await query("UPDATE messages SET read = true WHERE id = $1 RETURNING *", [messageId])

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to update message" })
  }
})

export default router
