import OrderSchema from './../schemas/OrderSchema.js';

const ordersController = {
    getOrders: async (req, res) => {
        try {
            const orders = await OrderSchema.find().populate('shipping');
            console.log(orders);
            res.status(200).json({ data: orders });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

export default ordersController;