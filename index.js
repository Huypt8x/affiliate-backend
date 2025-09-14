import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors()); // Cho phép frontend gọi API
app.use(express.json());

// Kết nối Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_KEY in environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// API: Lấy danh sách products
app.get("/products", async (req, res) => {
  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Lấy spotlight (hunt)
app.get("/hunt", async (req, res) => {
  try {
    const { data, error } = await supabase.from("hunt").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Root check
app.get("/", (req, res) => {
  res.send("🚀 API Server is running!");
});
// ✅ Route gốc
app.get("/", (req, res) => {
  res.send("🚀 API Server is running!");
});

// Server chạy port do Render cấp, local mặc định 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// Server chạy port do Render cấp, local mặc định 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
