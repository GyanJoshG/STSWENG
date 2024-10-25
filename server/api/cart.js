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

    // Ensure quantity is treated as a number
    const itemQuantity = Number(quantity);

    if (name in req.session.cart) {
        req.session.cart[name].inCart += itemQuantity; // Update quantity
    } else {
        req.session.cart[name] = { price, inCart: itemQuantity }; // Add new product
    }

    console.log('Cart in session:', req.session.cart); // Debugging log
    res.json({ message: 'Product added to cart', cart: req.session.cart });
});

export default router;
