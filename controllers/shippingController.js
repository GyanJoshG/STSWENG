import ShippingSchema from './../schemas/ShippingSchema.js';

const shippingController = {
    getShipping: async (req, res) => {
        console.log('getShipping() called');

        try {
            const shippings = await ShippingSchema.find();
            console.log(shippings);
            res.status(200).json({ data: shippings });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

export default shippingController;