import express from 'express';
import ordersController from '../../controllers/ordersController.js';
const router = express.Router();

router.get('/api/orders', ordersController.getOrders);

export default router;