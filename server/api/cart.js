import express from 'express';
import controller from './../../controllers/controller.js';
const router = express.Router();

// Go to cart page
router.get('/', controller.getCart);

// Add product to cart
router.post('/add-to-cart', (req, res) => {
    const { name, price, quantity } = req.body;

    // Initialize the cart if it doesn't exist in the session
    if (!req.session.cart) {
        req.session.cart = {};
    }

    // Check if the product is already in the session cart
    if (name in req.session.cart) {
        req.session.cart[name].inCart += quantity; // Update quantity
    } else {
        req.session.cart[name] = { price, inCart: quantity }; // Add new product
    }

    console.log('Cart in session:', req.session.cart); // Debugging log
    res.json({ message: 'Product added to cart', cart: req.session.cart });
});

export default router;
