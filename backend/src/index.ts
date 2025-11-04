import dotenv from "dotenv";

// Load environment variables FIRST, before anything else
dotenv.config();

import { ensureTablesExist } from "./config/database";

// Ensure database tables exist on startup
ensureTablesExist()
  .then(() => {
    console.log("✅ Database initialized successfully");
    require("./server");
  })
  .catch((error) => {
    console.error("[v0] Failed to initialize database:", error);
    process.exit(1);
  });