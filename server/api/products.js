import express from 'express';
import productsController from './../../controllers/productsController.js';
const router = express.Router();

// GET products
router.get('/api/products', productsController.getProducts);

export default router;