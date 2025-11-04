import express from "express"
import cors from "cors"
import http from "http"
import { Server as SocketServer } from "socket.io"
import { config } from "./config/env"
import { errorHandler } from "./middleware/errorHandler"
import {
  authRoutes,
  kycRoutes,
  walletRoutes,
  dealsRoutes,
  messagesRoutes,
  transactionsRoutes,
  profileRoutes,
  listingsRoutes,
  paymentsRoutes,
  notificationsRoutes,
} from "./routes"

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
  cors: { origin: "*" },
})

// Middleware
app.use(cors())
app.use(express.json())

// Health Check
app.get("/api/health", (req: any, res: any) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/kyc", kycRoutes)
app.use("/api/wallet", walletRoutes)
app.use("/api/deals", dealsRoutes)
app.use("/api/messages", messagesRoutes)
app.use("/api/transactions", transactionsRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/listings", listingsRoutes)
app.use("/api/payments", paymentsRoutes)
app.use("/api/notifications", notificationsRoutes)

// Error Handler (must be last)
app.use(errorHandler)

// WebSocket Events
io.on("connection", (socket) => {
  console.log(`[v0] User connected: ${socket.id}`)

  socket.on("join-deal", (dealId) => {
    socket.join(`deal-${dealId}`)
    console.log(`[v0] User joined deal: ${dealId}`)
  })

  socket.on("send-message", (data: { dealId: string; text: string; senderId: string; senderName: string }) => {
    io.to(`deal-${data.dealId}`).emit("receive-message", {
      ...data,
      timestamp: new Date().toISOString(),
    })
  })

  socket.on("notify", (data: { userId: string; title: string; message: string; type: string }) => {
    io.to(`user-${data.userId}`).emit("notification", {
      ...data,
      timestamp: new Date().toISOString(),
    })
  })

  socket.on("deal-status-change", (data: { dealId: string; status: string }) => {
    io.to(`deal-${data.dealId}`).emit("deal-updated", data)
  })

  socket.on("disconnect", () => {
    console.log(`[v0] User disconnected: ${socket.id}`)
  })

  socket.on("error", (error) => {
    console.error(`[v0] WebSocket error: ${error}`)
  })
})

server.listen(config.PORT, () => {
  console.log(`[v0] Vaulta server running on port ${config.PORT}`)
  console.log(`[v0] Environment: ${config.NODE_ENV}`)
})

export { app, io }
