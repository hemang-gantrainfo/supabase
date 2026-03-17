import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 6543,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await client.query("SELECT 1");

    console.log("✅ Connected to Supabase successfully!");
    await client.end();
  } catch (err) {
    console.error("❌ Connection Failed:", err.message);
  }
}

testConnection();