// TODO: Implement controller to routes
import express from 'express';
import ProductSchema from './../../schemas/ProductSchema.js';
const router = express.Router();

// GET products
router.get('/api/products', async (req, res) => {
    try {
        const products = await ProductSchema.find();
        console.log(products);
        res.status(200).json({ "data": products });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ "error": err.message });
    }
});

export default router;