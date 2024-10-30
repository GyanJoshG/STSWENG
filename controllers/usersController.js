import UserSchema from './../schemas/UserSchema.js';

const usersController = {
    getUsers: async (req, res) => {
        try {
            const users = await UserSchema.find();
            console.log(users);
            res.status(200).json({ data: users });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

export default usersController;