import { Router, type Response } from "express"
import { query } from "../config/database"
import { authMiddleware, type AuthRequest } from "../middleware/auth"

const router = Router()

// Get Notifications
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query("SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20", [
      req.userId,
    ])

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" })
  }
})

// Mark as Read
router.put("/:notificationId/read", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { notificationId } = req.params

    const result = await query("UPDATE notifications SET read = true WHERE id = $1 RETURNING *", [notificationId])

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to update notification" })
  }
})

export default router
