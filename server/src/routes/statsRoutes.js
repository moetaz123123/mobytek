import { Router } from 'express';
import { getDashboardStats } from '../controllers/statsController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/overview', requireAdmin, getDashboardStats);

export default router;
