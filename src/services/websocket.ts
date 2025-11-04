import { io, type Socket } from "socket.io-client"

const WS_URL = process.env.EXPO_PUBLIC_WS_URL || "http://localhost:3000"

let socket: Socket | null = null

export function initializeWebSocket(): Socket {
  if (!socket) {
    socket = io(WS_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })

    socket.on("connect", () => {
      console.log("[v0] WebSocket connected:", socket?.id)
    })

    socket.on("disconnect", () => {
      console.log("[v0] WebSocket disconnected")
    })

    socket.on("error", (error) => {
      console.error("[v0] WebSocket error:", error)
    })
  }

  return socket
}

export function getWebSocket(): Socket {
  if (!socket) {
    return initializeWebSocket()
  }
  return socket
}

export function joinDealChat(dealId: string) {
  const ws = getWebSocket()
  ws.emit("join-deal", dealId)
}

export function sendChatMessage(dealId: string, text: string, senderId: string, senderName: string) {
  const ws = getWebSocket()
  ws.emit("send-message", { dealId, text, senderId, senderName })
}

export function onReceiveMessage(callback: (data: any) => void) {
  const ws = getWebSocket()
  ws.on("receive-message", callback)
}

export function onNotification(callback: (data: any) => void) {
  const ws = getWebSocket()
  ws.on("notification", callback)
}

export function onDealUpdated(callback: (data: any) => void) {
  const ws = getWebSocket()
  ws.on("deal-updated", callback)
}

export function notifyDealStatusChange(dealId: string, status: string) {
  const ws = getWebSocket()
  ws.emit("deal-status-change", { dealId, status })
}

export function sendNotification(userId: string, title: string, message: string, type: string) {
  const ws = getWebSocket()
  ws.emit("notify", { userId, title, message, type })
}

export function disconnectWebSocket() {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
