import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
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

  let status = "❌ Not Connected";
  let error = "";

  try {
    await client.connect();

    const result = await client.query("SELECT 1");

    if (result) {
      status = "✅ Connected to Supabase successfully!";
    }

    await client.end();

    return res.status(200).json({
      status,
    });
  } catch (err) {
    error = err.message;

    return res.status(500).json({
      status: "❌ Connection Failed",
      error,
    });
  }
}