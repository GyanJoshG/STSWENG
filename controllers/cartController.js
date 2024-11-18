import Product from '../schemas/ProductSchema.js';
import Shipping from '../schemas/ShippingSchema.js';
import User from '../schemas/UserSchema.js';
import Order from '../schemas/OrderSchema.js';

const cartController = {
    getCart: (req, res, next) => {
        console.log('getCart() called');

        if(req.session.user) {
            const cart = req.session.cart || {}; 
            
            console.log('Cart in session: ', cart);
            
            if (typeof cart !== 'object' || Array.isArray(cart)) {
                return res.status(400).send('Cart is not in expected format');
            }
        
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
        console.log('Checkout initiated');
        
        const session = await Product.startSession();
        session.startTransaction();
        
        try {
            const shippingData = req.body;
            const cartItems = Object.entries(req.session.cart);
    
            if (cartItems.length === 0) {
                console.log('Cart is empty. No items to process.');
                return res.status(400).json({ message: 'Cart is empty. Cannot proceed with checkout.' });
            }
    
            let totalItems = 0;
            let totalPrice = 0;
    
            console.log('Cart Items:', cartItems);
    
            const orderItems = [];
    
            for (let [name, item] of cartItems) {
                totalItems += item.inCart;
                totalPrice += item.inCart * item.price;
                console.log(`Item: ${name}, Quantity: ${item.inCart}, Price: ${item.price}`);
                
                const product = await Product.findOne({ name }).session(session);
                if (!product) {
                    console.error(`Product not found: ${name}`);
                    throw new Error(`Product ${name} not found`);
                }
    
                orderItems.push({
                    productId: product._id,         // Reference to Product's _id
                    productName: product.name,      // Store the product's name
                    quantity: item.inCart,          // Quantity from the cart
                    price: product.price            // Price from the product
                });
            }
    
            console.log('Saving shipping data...');
            const newShipping = new Shipping(shippingData);
            await newShipping.save();
            console.log('Shipping data saved:', newShipping);
    
            console.log('Creating new order...');
            const newOrder = new Order({
                userId: req.session.user._id,
                items: orderItems, 
                shipping: newShipping,
                totalPrice,
                status: 'Pending'
            });
    
            await newOrder.save();
            console.log('New order saved:', newOrder);
    
            console.log('Updating user with new order...');
            const updatedUser = await User.updateOne(
                { _id: req.session.user._id },
                {
                    $push: { orderIds: newOrder._id },
                    $set: { shippingId: newShipping._id }
                }
            );
    
            if (updatedUser.nModified === 0) {
                console.log('User update failed');
                throw new Error('User update failed');
            }
    
            console.log('User updated with new order and shippingId:', updatedUser);
    
            console.log('Updating stock and sold for cart items...');
            for (let [name, item] of cartItems) {
                console.log(`Processing item ${name}`);
                const product = await Product.findOne({ name }).session(session);
                if (!product) {
                    console.error(`Product not found: ${name}`);
                    throw new Error(`Product ${name} not found`);
                }
                await Product.updateOne(
                    { name },
                    {
                        $inc: {
                            stock: -item.inCart,
                            sold: item.inCart
                        }
                    }).session(session);
            }
    
            await session.commitTransaction();
            session.endSession();
    
            req.session.cart = {};
            console.log('Cart cleared after checkout');
    
            res.status(201).json({ message: 'Checkout successful!' });
        } catch (error) {
            console.error('Error during checkout:', error);
            await session.abortTransaction();
            session.endSession();
            res.status(500).json({ message: 'Error during checkout', error: error.message });
        }
    }              
    
}

export default cartController;
