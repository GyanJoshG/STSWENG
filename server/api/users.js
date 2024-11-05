import express from 'express';
import usersController from '../../controllers/usersController.js';
const router = express.Router();

router.get('/api/users', usersController.getUsers);
router.get('/api/users/exists', usersController.checkUserExists);
router.post('/api/users/create', usersController.createUser);

export default router;