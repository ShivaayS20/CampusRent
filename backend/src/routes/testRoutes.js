import express from "express";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed 🔐",
    user: req.user,
  });
});

export default router;
