import { Router } from 'express';
const router = Router();
import { createRestaurant, addMenuItem, getMenuItems } from '../controllers/restaurantController';
import authMiddleware from '../utils/authMiddleware';

router.post('/create', authMiddleware, createRestaurant);
router.post('/menu/add', authMiddleware, addMenuItem);
router.get('/menu/:restaurantId', getMenuItems);

export default router;