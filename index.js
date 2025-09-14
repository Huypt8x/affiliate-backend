import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors()); // Cho phép frontend gọi API
app.use(express.json());

// Kết nối Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// API: Lấy danh sách products
app.get("/products", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// API: Lấy spotlight (hunt)
app.get("/hunt", async (req, res) => {
  const { data, error } = await supabase.from("hunt").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Server chạy port do Render cấp, local mặc định 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
