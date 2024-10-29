import express from 'express';
import controller from './../../controllers/controller.js';
import Product from '../../schemas/ProductSchema.js';
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

// Update quantity for an item in the cart
router.post('/update-quantity', async (req, res) => {
    const { name, change } = req.body;

    // Initialize the cart if it doesn't exist
    if (!req.session.cart || !req.session.cart[name]) {
        return res.json({ success: false, message: 'Item not found in cart' });
    }

    const itemInCart = req.session.cart[name];
    const newQuantity = itemInCart.inCart + change;

    try {
        // Fetch the product from the database to get its stock
        const product = await Product.findOne({ name });

        if (!product) {
            return res.json({ success: false, message: 'Product not found' });
        }

        const stock = product.stock;

        // Check stock limits
        if (newQuantity < 0) {
            return res.json({ success: false, message: 'Quantity cannot be less than 0' });
        }

        if (newQuantity > stock) {
            return res.json({ success: false, message: 'Insufficient stock available' });
        }

        // Update the quantity in the cart or remove the item if quantity is 0
        if (newQuantity === 0) {
            delete req.session.cart[name]; // Remove the item from the cart
        } else {
            itemInCart.inCart = newQuantity; // Update the quantity in the cart
        }

        res.json({ success: true, cart: req.session.cart });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;
