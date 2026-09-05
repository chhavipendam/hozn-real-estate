import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/database";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// In production, restrict CORS to your deployed frontend's URL via
// FRONTEND_URL (e.g. https://your-app.vercel.app). Falls back to "*" for
// local development so you don't need to configure anything to get started.
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);


sequelize.sync().then(() => {
  console.log("📌 Database connected!");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((error) => {
  console.error("❌ Database connection error:", error);
});
