import { Router } from 'express';
import ordersController from '../controllers/orders.controller.js';

const router = Router();

router.get('/:email', ordersController.getOrders);

router.post('/:idUser', ordersController.saveOrder);

export default router;