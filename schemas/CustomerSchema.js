import mongoose from "mongoose"

const CustomerSchema = new mongoose.Schema(
    {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      email: { type: String, lowercase: true },
      phoneNumber: { type: String, trim: true },
      address: {
        street: { type: String, required: true }, 
        city: { type: String, required: true },   
        state: { type: String, required: true },  
        zipCode: { type: String, required: true },
      },
      preferredPaymentMethod: {
        type: String,
        enum: ['Gcash', 'Cash on Delivery'],  
        default: 'Cash on Delivery'
      }
    },
    { versionKey: false }
  );

const Customer = mongoose.model("Customer", CustomerSchema);
export default mongoose.models.Customer || Customer;