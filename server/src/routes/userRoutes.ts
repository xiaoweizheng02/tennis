import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/password', userController.changePassword);
router.post('/logout', userController.logout);

export default router;