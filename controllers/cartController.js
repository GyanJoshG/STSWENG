import Product from '../schemas/ProductSchema.js';
import Shipping from '../schemas/ShippingSchema.js';

const cartController = {
    getCart: (req, res, next) => {
        console.log('getCart() called');

        if(req.session.user) {
            const cart = req.session.cart || {}; // Default to an empty object if no cart exists
            
            console.log('Cart in session: ', cart);
            
            // Check if cart is an object
            if (typeof cart !== 'object' || Array.isArray(cart)) {
                return res.status(400).send('Cart is not in expected format');
            }
        
            // Calculate total amount and prepare data for rendering
            const cartItems = Object.entries(cart).map(([name, item]) => ({
                name,
                price: item.price,
                quantity: item.inCart,
            }));
        
            const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        
            res.render('cart', { cart: cartItems, total });
        } else {
            req.body = { stat: 401, title: 'Cart Inaccessible', body: 'Cart not accessible. Please log in first.' };
            next();
        }
    },

    addToCart: (req, res) => {
        console.log('addToCart() called');

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
    },

    updateQuantity: async (req, res) => {
        console.log('updateQuantity() called');

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
    },

    checkout: async (req, res) => {
        console.log('checkout() called');

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
    }
}

export default cartController;
