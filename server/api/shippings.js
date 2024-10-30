import express from 'express';
import shippingsController from './../../controllers/shippingsController.js';
const router = express.Router();

// GET shippings
router.get('/api/shippings', shippingsController.getShippings);

export default router;