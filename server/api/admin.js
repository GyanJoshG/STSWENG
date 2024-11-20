import express from 'express';
import adminController from './../../controllers/adminController.js';
const router = express.Router();

// Go to admin page
router.get('/admin', adminController.getAdmin);
router.post('/admin/edit-product', adminController.editProduct);
router.post('/admin/delete-product', adminController.deleteProduct);
router.post('/admin/create-product', adminController.createProduct);
export default router;