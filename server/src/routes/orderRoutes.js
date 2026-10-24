import { Router } from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} from '../controllers/orderController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

// Public: place an order
router.post('/', createOrder);

// Protected admin routes: view all orders and update status
router.get('/', requireAdmin, getOrders);
router.get('/:id', requireAdmin, getOrderById);
router.put('/:id/status', requireAdmin, updateOrderStatus);

export default router;
