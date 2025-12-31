import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, (req, res) => {
  res.json({
    message: "Profile data fetched successfully",
    user: req.user,
  });
});

export default router;
