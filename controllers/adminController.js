import Product from '../schemas/ProductSchema.js';

const adminController = {
    getAdmin: async (req, res) => {
        console.log('getAdmin() called');

        try {
            const products = await Product.find({}).lean();

            res.status(200).render('admin', { products });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

export default adminController;
