import express from 'express';
import usersController from '../../controllers/usersController.js';
const router = express.Router();

router.get('/api/users', usersController.getUsers);

export default router;