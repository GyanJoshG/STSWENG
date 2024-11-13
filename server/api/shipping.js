import express from 'express';
import shippingController from './../../controllers/shippingController.js';
const router = express.Router();

// GET shippings
router.get('/api/shipping', shippingController.getShipping);

export default router;