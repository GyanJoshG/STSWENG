import express from 'express';
import controller from './../../controllers/controller.js';
import Product from '../../schemas/ProductSchema.js';
import Shipping from '../../schemas/ShippingSchema.js';
const router = express.Router();

// Go to cart page
router.get('/', controller.getCart);

// Add product to cart
router.post('/add-to-cart', (req, res) => {
    const { name, price, quantity } = req.body;

    if (!req.session.cart) {
        req.session.cart = {};
    }

    const itemQuantity = Number(quantity);

    if (name in req.session.cart) {
        req.session.cart[name].inCart += itemQuantity; 
    } else {
        req.session.cart[name] = { price, inCart: itemQuantity }; 
    }

    console.log('Cart in session:', req.session.cart); 
    res.json({ message: 'Product added to cart', cart: req.session.cart });
});

// Update quantity for an item in the cart
router.post('/update-quantity', async (req, res) => {
    const { name, change } = req.body;

    if (!req.session.cart || !req.session.cart[name]) {
        return res.json({ success: false, message: 'Item not found in cart' });
    }

    const itemInCart = req.session.cart[name];
    const newQuantity = itemInCart.inCart + change;

    try {
        const product = await Product.findOne({ name });

        if (!product) {
            return res.json({ success: false, message: 'Product not found' });
        }

        const stock = product.stock;

        if (newQuantity < 0) {
            return res.json({ success: false, message: 'Quantity cannot be less than 0' });
        }

        if (newQuantity > stock) {
            return res.json({ success: false, message: 'Insufficient stock available' });
        }

        if (newQuantity === 0) {
            delete req.session.cart[name]; 
        } else {
            itemInCart.inCart = newQuantity; 
        }

        res.json({ success: true, cart: req.session.cart });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/checkout', async (req, res) => {

    try {
        const shippingData = req.body;
        
        const cartItems = Object.entries(req.session.cart);
    

        for (let [name, item] of cartItems) {
            await Product.updateOne(
                { name },
                {
                    $inc: { 
                        stock: -item.inCart,        
                        sold: item.inCart          
                    }
                }
            );
        }

        const newShipping = new Shipping(shippingData);
        await newShipping.save();

        req.session.cart = {};
        
        res.status(201).json({ message: 'Checkout successful!' });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ message: 'Error during checkout' });
    }
});

export default router;