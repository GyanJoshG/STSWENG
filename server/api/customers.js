// TODO: Implement feature for authorized users to access customer information
// TODO: Implement controller to routes
import express from 'express';
import CustomerSchema from '../../schemas/CustomerSchema.js';
const router = express.Router();

// GET customers
router.get('/api/customers', async (req, res) => {
    try {
        const customers = await CustomerSchema.find();
        console.log(customers);
        res.status(200).json({ "data": customers });
    } catch (err) {
        console.error(err);
        res.status(200).json({ "error": err.message });
    }
});

export default router;