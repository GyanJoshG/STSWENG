import UserSchema from './../schemas/UserSchema.js';
import OrderSchema from '../schemas/OrderSchema.js';
import mongoose from 'mongoose';

const profileController = {
    getProfile: async (req, res) => {
        console.log('getProfile() called');
        try {
            const userId = req.session.user._id; 
            console.log('User ID from session:', userId);
            
            // Use 'new' keyword to create ObjectId
            const objectIdUserId = new mongoose.Types.ObjectId(userId);
            
            // Fetch the user by ID
            const user = await UserSchema.findById(objectIdUserId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Fetch the orders related to the user
            const orders = await OrderSchema.find({ userId: objectIdUserId })
            
            console.log('Orders for user:', orders); // Log to debug

            res.status(200).render('profile', { user: user.toObject(), orders });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
        }
    },

    cancelOrder: async (req, res) => {
        try {
            const { orderId } = req.body;  
            const userId = req.session.user._id;

            const deletedOrder = await OrderSchema.deleteOne(
                { _id: orderId, userId: userId, status: 'Pending' }
            );

            if (deletedOrder.deletedCount === 0) {
                return res.status(404).json({ message: 'Order not found or cannot be cancelled' });
            }

            await UserSchema.updateOne(
                { _id: userId },
                { $pull: { orderIds: new mongoose.Types.ObjectId(orderId) } }  
            );

            res.redirect('/profile');
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
        }
    }
    
};

export default profileController;
