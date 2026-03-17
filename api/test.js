import { Client } from "pg";

export default async function handler(req, res) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,

    // 🔥 Force SSL override
    ssl: {
      rejectUnauthorized: false,
    },

    // 🔥 IMPORTANT: ignore SSL from URL
    options: "-c sslmode=no-verify",
  });

  try {
    await client.connect();

    const result = await client.query("SELECT 1");

    await client.end();

    return res.status(200).json({
      status: "✅ Connected to Supabase successfully!",
      data: result.rows,
    });

  } catch (err) {
    console.error("DB ERROR FULL:", err);

    return res.status(500).json({
      status: "❌ Connection Failed",
      error: err.message,
    });
  }
}