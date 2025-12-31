// backend/src/controllers/itemController.js
import Item from "../models/Item.js";

/* Create new item */
export const createItem = async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add item" });
  }
};

/* Get all items (Marketplace) */
export const getAllItems = async (req, res) => {
  const items = await Item.find().populate("owner", "firstName email");
  res.json(items);
};

/* Get logged-in user's items */
export const getMyItems = async (req, res) => {
  const items = await Item.find({ owner: req.user._id });
  res.json(items);
};
