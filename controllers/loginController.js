import User from './../schemas/UserSchema.js';
import bcrypt from 'bcrypt';

const loginController = {
    getLogin: (req, res) => {
        console.log('getLogin() called');

        try {
            res.status(200).render('login');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },
    postLogin: async (req, res) => {
        console.log('postLogin() called');
    
        const { username, password } = req.body;
    
        if (!username || !password) {
            return res.status(400).json({ error: 'There is an empty field.' });
        }
    
        try {
            const user = await User.findOne({ username });
    
            if (!user) {
                return res.status(400).json({ error: 'User not found.' });
            }
    
            const match = await bcrypt.compare(password, user.password);
    
            if (match) {
                req.session.user = { 
                    username: user.username, 
                    _id: user._id,
                    isAdmin: user.isAdmin 
                };
                return res.status(200).json({ message: 'Login successful!', isAdmin: user.isAdmin });
            } else {
                return res.status(400).json({ error: 'Invalid password.' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    },    
    logout: (req, res) => {
        console.log('logout() called');

        req.session.destroy((err) => {
            if(!err) {
                res.status(200).json({ message: 'Logout successful!' });
            } else {
                console.error(err);
                res.status(500).json({ error: error.message });
            }
        });
    }
}

export default loginController;