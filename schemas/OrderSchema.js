import mongoose from 'mongoose'
import Item from './ItemSchema.js';
const ObjectId = mongoose.Schema.Types.ObjectId;

const OrderSchema = new mongoose.Schema(
    {
      userId: { type: ObjectId, required: true },
      items: { type: [Item], required: true },
      shipping: { type: ObjectId, ref: 'Shipping', required: true },
      totalPrice: { type: Number, required: true },
      status: { type: String, required: true, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending', required: true },
    },
    { versionKey: false }
  );

const Order = mongoose.model('Order', OrderSchema);
export default mongoose.models.Order || Order;