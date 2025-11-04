import { query } from "../src/config/database"
import { hash } from "bcryptjs"

async function seedDatabase() {
  try {
    console.log("[v0] Starting database seeding...")

    // Create test users
    const password = await hash("password123", 10)

    const user1 = await query(
      `INSERT INTO users (email, username, password, name, phone, kyc_status, wallet_balance, escrow_balance)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      ["buyer@example.com", "buyer", password, "John Buyer", "+233123456789", "verified", 5000, 0],
    )

    const user2 = await query(
      `INSERT INTO users (email, username, password, name, phone, kyc_status, wallet_balance, escrow_balance)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      ["seller@example.com", "seller", password, "Sarah Seller", "+233987654321", "verified", 2000, 500],
    )

    console.log("[v0] Test users created")

    // Create sample listings
    const listings = [
      {
        seller_id: user2.rows[0].id,
        title: "iPhone 15 Pro Max",
        description: "Excellent condition, barely used",
        price: 3500,
        category: "Electronics",
      },
      {
        seller_id: user2.rows[0].id,
        title: "Web Development Service",
        description: "Full-stack development package",
        price: 2000,
        category: "Services",
      },
      {
        seller_id: user1.rows[0].id,
        title: "Logo Design",
        description: "Professional brand identity design",
        price: 500,
        category: "Services",
      },
    ]

    for (const listing of listings) {
      await query(
        `INSERT INTO listings (seller_id, title, description, price, category, status)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [listing.seller_id, listing.title, listing.description, listing.price, listing.category, "active"],
      )
    }

    console.log("[v0] Sample listings created")

    // Create sample escrow deal
    const deal = await query(
      `INSERT INTO escrow_deals (buyer_id, seller_id, item_name, amount, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [user1.rows[0].id, user2.rows[0].id, "iPhone 15 Pro Max", 3500, "in_escrow"],
    )

    console.log("[v0] Sample escrow deal created")

    // Create notifications
    await query(
      `INSERT INTO notifications (user_id, title, message, type)
       VALUES ($1, $2, $3, $4)`,
      [user1.rows[0].id, "Deal Created", "New escrow deal: iPhone 15 Pro Max", "transaction"],
    )

    console.log("[v0] Sample notifications created")
    console.log("[v0] Database seeding completed successfully!")
    process.exit(0)
  } catch (error) {
    console.error("[v0] Seeding error:", error)
    process.exit(1)
  }
}

seedDatabase()
