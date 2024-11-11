import express from 'express';
import loginController from './../../controllers/loginController.js';
const router = express.Router();

router.get('/login', loginController.getLogin); // Go to login page
router.post('/api/login', loginController.postLogin); // Process login
router.post('/api/logout', loginController.logout); // Log out

export default router;