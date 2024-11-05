import express from 'express';
import controller from './../../controllers/loginController.js';
const router = express.Router();

// Go to login page
router.get('/login', controller.getLogin);

export default router;