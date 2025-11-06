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


const allowedOrigins = [
  "https://smart-dairy-manager.vercel.app",
  "https://smart-dairy-manager-5apl7su7e-rohit-guptas-projects-33ad8a72.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


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
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
