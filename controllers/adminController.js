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
    },
    
    editProduct: async (req, res) => {
        try {
            const { id, name, price, stock, isAvailable, type, occasion, imgSrc, color } = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(
                id, 
                { name, price, stock, isAvailable, type, occasion, imgSrc, color }, 
                { new: true } 
            );
            res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update product' });
        }
    }
};

export default adminController;
