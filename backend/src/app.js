import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use("/api/test", testRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/items", itemRoutes);


/* Test Route */
app.get("/", (req, res) => {
  res.send("CampusRent Backend is Running 🚀");
});

/* Auth Routes */
app.use("/api/auth", authRoutes);

export default app;
