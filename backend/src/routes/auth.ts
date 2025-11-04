import { Router, type Request, type Response } from "express"
import { hash, compare } from "bcryptjs"
import { query } from "../config/database"
import { generateToken, type AuthRequest, authMiddleware } from "../middleware/auth"

const router = Router()

// Sign Up
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, username, password, name, phone } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing required fields: email, password, name" })
    }

    const hashedPassword = await hash(password, 10)

    const result = await query(
      "INSERT INTO users (email, username, password, name, phone, kyc_status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [email, username || null, hashedPassword, name, phone || null, "pending"],
    )

    const user = result.rows[0]
    const token = generateToken(user.id)

    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, username: user.username, name: user.name, kycStatus: user.kyc_status },
    })
  } catch (error: any) {
    if (error.code === "23505") {
      if (error.constraint === "users_email_key") {
        res.status(409).json({ error: "Email already exists" })
      } else if (error.constraint === "users_username_key") {
        res.status(409).json({ error: "Username already exists" })
      }
    } else {
      res.status(500).json({ error: "Signup failed" })
    }
  }
})

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    if ((!email && !username) || !password) {
      return res.status(400).json({ error: "Email or username and password required" })
    }

    // Query by email or username
    let result
    if (email) {
      result = await query("SELECT * FROM users WHERE email = $1", [email])
    } else {
      result = await query("SELECT * FROM users WHERE username = $1", [username])
    }

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const user = result.rows[0]
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = generateToken(user.id)

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        kycStatus: user.kyc_status,
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Login failed" })
  }
})

// Get Current User
router.get("/me", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      "SELECT id, email, username, name, phone, kyc_status, wallet_balance, escrow_balance, created_at FROM users WHERE id = $1",
      [req.userId],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" })
  }
})

export default router
