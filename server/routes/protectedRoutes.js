import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Test protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user,
  });
});

export default router;