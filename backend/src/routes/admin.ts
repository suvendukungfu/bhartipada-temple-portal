import express from 'express';
import { getAnalyticsObject } from '../controllers/adminController';
import { adminAuth } from '../middleware/auth';

const router = express.Router();

router.get('/analytics', adminAuth, getAnalyticsObject);

export default router;
