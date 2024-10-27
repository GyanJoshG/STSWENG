import mongoose from 'mongoose'

const ShippingSchema = new mongoose.Schema(
    {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      phoneNumber: { type: String, required: true, trim: true },
      address: {
        street: { type: String, required: true, trim: true }, 
        city: { type: String, required: true, trim: true },   
        state: { type: String, required: true, trim: true  },  
        zipCode: { type: String, required: true, trim: true  },
      },
      preferredPaymentMethod: {
        type: String,
        enum: ['Gcash', 'Cash on Delivery'],  
        default: 'Cash on Delivery'
      }
    },
    { versionKey: false, _id: false }
  );

export default ShippingSchema;