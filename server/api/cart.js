import express from 'express';
import cartController from './../../controllers/cartController.js';
const router = express.Router();

// Go to cart page
router.get('/cart', cartController.getCart);
router.post('/add-to-cart', cartController.addToCart); 
router.post('/update-quantity', cartController.updateQuantity); 
router.post('/checkout', cartController.checkout); 

export default router;
