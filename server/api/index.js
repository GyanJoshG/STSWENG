// TODO: Implement controller to routes
import express from 'express';
const router = express.Router();

// Go to home page
router.get('/', (req, res) => {
    try {
        console.log('Requested home page');
        res.status(200).render('index');
    } catch (err) {
        console.error(err);
    }
});

export default router;