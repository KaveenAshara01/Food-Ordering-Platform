import { Router } from 'express';
const router = Router();
import { assignDelivery, updateDeliveryStatus, getDeliveryAssignments } from '../controllers/deliveryController';
import authMiddleware from '../utils/authMiddleware';

router.post('/assign', authMiddleware, assignDelivery);
router.put('/status', authMiddleware, updateDeliveryStatus);
router.get('/assignments', authMiddleware, getDeliveryAssignments);

export default router;