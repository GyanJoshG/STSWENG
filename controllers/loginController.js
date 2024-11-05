const loginController = {
    getLogin: (req, res) => {
        try {
            console.log('Requested login page');
            res.status(200).render('login');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

export default loginController;