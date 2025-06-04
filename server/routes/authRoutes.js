import express from 'express';
import { signupUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Register new user
router.post('/signup', signupUser);

// Login user
router.post('/login', loginUser);

export default router;