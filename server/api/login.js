import express from 'express';
import controller from './../../controllers/loginController.js';
const router = express.Router();

router.get('/login', controller.getLogin); // Go to login page
router.post('/api/login', controller.postLogin); // Process login
router.post('/api/logout', controller.logout); // Log out

export default router;