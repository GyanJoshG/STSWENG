import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
      name: { type: String, trim: true, required: true },
      price: { type: Number, required: true, required: true  },
      stock: { type: Number, required: true },
      sold: { type: Number, required: true },
      isAvailable: { type: Boolean, required: true },
      type: { type: String, trim: true, required: true }, // might have to change this to enum
      occasion: { type: String, trim: true, required: true }, // might have to change this to enum
      imgSrc: { type: String, trim: true, required: true }, 
      color: { type: String, trim: true, required: true }, // might have to change this to enum
    },
    { versionKey: false }
  );

const Product = mongoose.model("Product", ProductSchema);
export default mongoose.models.Product || Product;