import UserSchema from './../schemas/UserSchema.js';
import OrderSchema from '../schemas/OrderSchema.js';
import mongoose from 'mongoose';

const profileController = {
    getProfile: async (req, res) => {
        console.log('getProfile() called');
        try {
            const userId = req.session.user._id; 
            const isAdmin = req.session.user.isAdmin; 
            
            console.log('User ID from session:', userId);
            console.log('Is Admin:', isAdmin);

            let orders;

            if (isAdmin) {
                orders = await OrderSchema.find({ status: { $ne: 'Delivered' } })
                    .populate('shipping'); 
            } else {
                orders = await OrderSchema.find({ userId })
                    .populate('shipping'); 
            }

            console.log('Orders:', orders);

            res.status(200).render('profile', { 
                user: req.session.user, 
                orders,
                isAdmin: req.session.user.isAdmin
            });
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
    },
    changeOrderStatus: async (req, res) => {
        try {
            const { orderId, status } = req.body;
            const userId = req.session.user._id;
            const isAdmin = req.session.user.isAdmin;

            let order;

            if (isAdmin) {
                order = await OrderSchema.findById(orderId);
            } else {
                order = await OrderSchema.findOne({ _id: orderId, userId });
            }

            if (!order) {
                return res.status(404).json({ message: 'Order not found or you do not have permission to update this order.' });
            }

            order.status = status;
            await order.save();

            res.redirect('/profile');  
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
        }
    },
    
};

export default profileController;
