import { Router } from 'express';
const router = Router();
import { placeOrder, updateOrderStatus, getCustomerOrders } from '../controllers/orderController';
import authMiddleware from '../utils/authMiddleware';

router.post('/place', authMiddleware, placeOrder);
router.put('/status', authMiddleware, updateOrderStatus);
router.get('/customer', authMiddleware, getCustomerOrders);

export default router;