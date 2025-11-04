import { Router, type Response } from "express"
import { query } from "../config/database"
import { authMiddleware, type AuthRequest } from "../middleware/auth"

const router = Router()

// Submit KYC
router.post("/submit", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, dateOfBirth, idType, idNumber, address, city } = req.body

    const result = await query(
      `INSERT INTO kyc (user_id, first_name, last_name, date_of_birth, id_type, id_number, address, city, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [req.userId, firstName, lastName, dateOfBirth, idType, idNumber, address, city, "under-review"],
    )

    await query("UPDATE users SET kyc_status = $1 WHERE id = $2", ["under-review", req.userId])

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "KYC submission failed" })
  }
})

// Get KYC Status
router.get("/status", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query("SELECT * FROM kyc WHERE user_id = $1", [req.userId])
    res.json(result.rows[0] || null)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch KYC status" })
  }
})

export default router
