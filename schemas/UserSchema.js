import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, trim: true, lowercase: true, unique: true },
      email: { type: String, required: true, trim: true, lowercase: true, unique: true },
      password: { type: String, required: true, trim: true },
      orderIds: { type: [ObjectId], default: [] },
      shippingId: { type: ObjectId, default: null }
    },
    { versionKey: false }
  );

const User = mongoose.model('User', UserSchema);
export default mongoose.models.User || User;