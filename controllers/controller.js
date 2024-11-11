/*
    Defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const controller = {
    getFavicon: function (req, res) {
        console.log('getFavicon() called');

        res.status(204);
    },
    getIndex: (req, res) => {
        console.log('getIndex() called');

        try {
            if(req.session.user) {
                res.status(200).render('index', { isLogin: false });
            } else {
                res.status(200).render('index', { isLogin: true });
            }
        } catch (err) {
            console.error(err);
        }
    },
    getSignUp: (req, res) => {
        console.log('getSignUp() called');

        try {
            console.log('Requested sign up page');
            res.status(200).render('signup');
        } catch (err) {
            console.error(err);
        }
    },
    getCart: (req, res) => {
        console.log('getCart() called');

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
    }  
};

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
export default controller;