import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
      name: { type: String, trim: true },
      price: { type: Number },
      stock: { type: Number },
      sold: { type: Number },
      isAvailable: { type: Boolean },
      type: { type: String, trim: true }, // might have to change this to enum
      occasion: { type: String, trim: true }, // might have to change this to enum
    },
    { versionKey: false }
  );

const Product = mongoose.model("Product", ProductSchema);
export default mongoose.models.Product || Product;