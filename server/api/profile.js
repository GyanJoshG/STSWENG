import express from 'express';
import profileController from '../../controllers/profileController.js';
const router = express.Router();

router.get('/profile', profileController.getProfile);
router.post('/cancel-order', profileController.cancelOrder);
router.post('/change-order-status', profileController.changeOrderStatus);

export default router;