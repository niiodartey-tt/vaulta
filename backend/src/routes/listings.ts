import { Router, type Request, type Response } from "express"
import { query } from "../config/database"
import { authMiddleware, type AuthRequest } from "../middleware/auth"

const router = Router()

// Create Listing
router.post("/create", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, price, category, image } = req.body

    if (!title || !price) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const result = await query(
      `INSERT INTO listings (seller_id, title, description, price, category, image_url, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [req.userId, title, description, price, category || "Other", image || null, "active"],
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to create listing" })
  }
})

// Get All Listings
router.get("/", async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query

    let whereClause = "WHERE status = 'active'"
    const params: any[] = []

    if (category) {
      whereClause += " AND category = $1"
      params.push(category)
    }

    if (search) {
      const paramIndex = params.length + 1
      whereClause += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`
      params.push(`%${search}%`)
    }

    const result = await query(
      `SELECT l.*, u.name as seller_name, u.avatar_url FROM listings l
       JOIN users u ON l.seller_id = u.id
       ${whereClause}
       ORDER BY l.created_at DESC`,
      params,
    )

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch listings" })
  }
})

// Get User's Listings
router.get("/my-listings", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query("SELECT * FROM listings WHERE seller_id = $1 ORDER BY created_at DESC", [req.userId])

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch listings" })
  }
})

// Update Listing
router.put("/:listingId", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { listingId } = req.params
    const { title, description, price, category } = req.body

    // Verify ownership
    const listingResult = await query("SELECT * FROM listings WHERE id = $1 AND seller_id = $2", [
      listingId,
      req.userId,
    ])

    if (listingResult.rows.length === 0) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    const result = await query(
      "UPDATE listings SET title = $1, description = $2, price = $3, category = $4 WHERE id = $5 RETURNING *",
      [title || null, description || null, price || null, category || null, listingId],
    )

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to update listing" })
  }
})

// Delete Listing
router.delete("/:listingId", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { listingId } = req.params

    // Verify ownership
    const listingResult = await query("SELECT * FROM listings WHERE id = $1 AND seller_id = $2", [
      listingId,
      req.userId,
    ])

    if (listingResult.rows.length === 0) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    await query("DELETE FROM listings WHERE id = $1", [listingId])

    res.json({ message: "Listing deleted" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete listing" })
  }
})

export default router
