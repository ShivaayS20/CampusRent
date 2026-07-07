import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

const app = express();

/* ✅ CORS - Allow frontend to connect */
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,        // e.g. your Vercel URL in production
].filter(Boolean);                 // removes undefined if FRONTEND_URL not set

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

/* Middleware */
// Change from 10mb to 50mb
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/* Test Route */
app.get("/", (req, res) => {
  res.send("CampusRent Backend is Running 🚀");
});

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/items", itemRoutes);

export default app;