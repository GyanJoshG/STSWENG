import express from 'express';
import controller from './../../controllers/controller.js';
const router = express.Router();

// Go to sign up page
router.get('/signup', controller.getSignUp);

export default router;