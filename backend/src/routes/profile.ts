import { Router, type Response } from "express"
import { query } from "../config/database"
import { authMiddleware, type AuthRequest } from "../middleware/auth"
import { hash } from "bcryptjs"

const router = Router()

// Get Profile
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      "SELECT id, email, name, phone, avatar_url, kyc_status, wallet_balance, escrow_balance, created_at FROM users WHERE id = $1",
      [req.userId],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" })
  }
})

// Update Profile
router.put("/update", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, phone, avatarUrl } = req.body

    const result = await query(
      "UPDATE users SET name = $1, phone = $2, avatar_url = $3, updated_at = NOW() WHERE id = $4 RETURNING id, email, name, phone, avatar_url, kyc_status",
      [name || null, phone || null, avatarUrl || null, req.userId],
    )

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" })
  }
})

// Change Password
router.post("/change-password", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const userResult = await query("SELECT password FROM users WHERE id = $1", [req.userId])

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }

    const { compare } = await import("bcryptjs")
    const passwordMatch = await compare(currentPassword, userResult.rows[0].password)

    if (!passwordMatch) {
      return res.status(401).json({ error: "Current password is incorrect" })
    }

    const hashedPassword = await hash(newPassword, 10)

    await query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, req.userId])

    res.json({ message: "Password changed successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to change password" })
  }
})

export default router
