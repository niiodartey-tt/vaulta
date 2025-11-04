import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { config } from "../config/env"

export interface AuthRequest extends Request {
  userId?: string
  user?: any
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "No token provided" })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as any
    req.userId = decoded.id
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
}

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, config.JWT_SECRET, { expiresIn: "7d" })
}
