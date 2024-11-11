import User from './../schemas/UserSchema.js';
import bcrypt from 'bcrypt';

const usersController = {
    getUsers: async (req, res) => {
        console.log('getUsers() called')

        try {
            const users = await User.find();
            console.log('users: ', users);
            res.status(200).json({ data: users });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },
    getUserByUsername: async (req, res) => {
        console.log('getUserByUsername() called');

        const { username } = req.body;

        try {
            const user = await User.findOne({ username });
            console.log('user: ', user);
            res.status(200).json({ data: user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },
    createUser: async (req, res) => {
        console.log('createUser() called');

        const { username, email, password, confirmPassword } = req.body;

        // Input validation
        if(!username || !email || !password || !confirmPassword) {  
            return res.status(400).json({ error: 'There is an empty field.' });
        }

        if(username.length < 3) {
            return res.status(400).json({ error: 'Username should be at least 3 characters' });
        }

        if(username.length > 20) {
            return res.status(400).json({ error: 'Username should not exceed 20 characters' });
        }
        
        if(email.length < 3) {
            return res.status(400).json({ error: 'Email should be at least 3 characters.' });
        }

        if(email.length > 254) {
            return res.status(400).json({ error: 'Email should not exceed 254 characters.' });
        }

        if(password.length < 8) {
            return res.status(400).json({ error: 'Password should be at least 8 characters long.' });
        }

        if(password.length > 64) {
            return res.status(400).json({ error: 'Password should not exceed 64 characters.' });
        }

        if(password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match.'});
        }

        try {
            let user = await User.findOne({ username });
            if(user) {
                return res.status(400).json({ error: 'Username already exists. Use a different username.' });
            }

            user = await User.findOne({ email });
            if(user) {
                return res.status(400).json({ error: 'Email already exists. Use a different email.' });
            }

            const hashedpw = await bcrypt.hash(password, 13);
            user = new User({ username, email, password: hashedpw });
            await user.save();
            
            res.status(200).json({ message: 'Registration successful!' });
        } catch(err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

export default usersController;