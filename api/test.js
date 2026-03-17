import { Client } from "pg";

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

  try {
    await client.connect();
    await client.query("SELECT 1");
    await client.end();

    return res.status(200).json({
      status: "✅ Connected to Supabase successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      status: "❌ Connection Failed",
      error: err.message,
    });
  }
}