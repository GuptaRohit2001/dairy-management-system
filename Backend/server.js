import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import farmerRoutes from "./routes/farmerRoutes.js";
import milkRoutes from "./routes/milkRoutes.js";
import salesRoutes from "./routes/saleRoutes.js";

dotenv.config();

const app = express();


app.use(cors());


app.use(express.json());

connectDB(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/milk", milkRoutes);
app.use("/api/sales", salesRoutes);

app.get("/", (req, res) => res.send("Dairy Management API is running... 🚀"));

app.use((req, res, next) => {
  console.log("Request received from:", req.headers.origin);
  next();
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));