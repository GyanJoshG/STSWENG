import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId;

const ItemSchema = new mongoose.Schema(
    {
      productId: { type: ObjectId, ref: 'Product', required: true },
      productName: { type: String, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, ref: 'Product', required: true },
    },
    { versionKey: false, _id: false }
  );

export default ItemSchema;