import express from 'express';
import adminController from './../../controllers/adminController.js';
const router = express.Router();

// Go to admin page
router.get('/admin', adminController.getAdmin);

export default router;