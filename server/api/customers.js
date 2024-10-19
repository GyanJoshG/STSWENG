// TODO: Implement feature for authorized users to access customer information
// TODO: Implement controller to routes
import express from 'express';
import customersController from './../../controllers/customersController.js';
const router = express.Router();

// GET customers
router.get('/api/customers', customersController.getCustomers);

export default router;