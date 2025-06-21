import { neon } from '@neondatabase/serverless'
import dotenv from 'dotenv'

dotenv.config()


console.log("DATABASE_URL:", process.env.DATABASE_URL);
// This will create SQL connection using our db url
export const sql = neon(process.env.DATABASE_URL)

export async function initDB() {
console.log("DATABASE_URL:", process.env.DATABASE_URL);

  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      ammount DECIMAL(10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    // DECIMAL(10,2)
    // 10 digiits total including 2 digit after decimal point
    // max value can be 99999999.99 (8 digit before . and 2 digit after)

    console.log("Database initialized successfully");
  } catch (e) {
    console.log("Error initializing DB", e);
    process.exit(1);
  }
}