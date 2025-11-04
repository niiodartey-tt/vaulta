import { ensureTablesExist } from "./config/database"

// Ensure database tables exist on startup
ensureTablesExist()
  .then(() => {
    require("./server")
  })
  .catch((error) => {
    console.error("[v0] Failed to initialize database:", error)
    process.exit(1)
  })
