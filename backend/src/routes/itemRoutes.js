import express from "express";
import {
  createItem,
  getAllItems,
  getMyItems,
} from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// Create item
router.post("/", protect, createItem);

// All items (Marketplace)
router.get("/", getAllItems);

// My listings
router.get("/my", protect, getMyItems);

export default router;
