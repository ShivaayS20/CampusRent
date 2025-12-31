import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: String,
    price: {
      type: Number,
      required: true,
    },
    image: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      default: "available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
