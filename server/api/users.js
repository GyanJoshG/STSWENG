import express from 'express';
import usersController from '../../controllers/usersController.js';
const router = express.Router();

router.get('/api/users', usersController.getUsers);
router.post('/api/users/create', usersController.createUser);
router.get('/api/users/:username', usersController.getUserByUsername);

export default router;