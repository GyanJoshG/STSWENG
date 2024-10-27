import mongoose from 'mongoose'
import Shipping from './ShippingSchema.js';

const UserSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, trim: true, lowercase: true, unique: true },
      email: { type: String, required: true, trim: true, lowercase: true, unique: true },
      password: { type: String, required: true, trim: true },
      shipping: { type: Shipping, default: null },
    },
    { versionKey: false }
  );

const User = mongoose.model('User', UserSchema);
export default mongoose.models.User || User;