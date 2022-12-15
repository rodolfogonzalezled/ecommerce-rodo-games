import { Router } from 'express';
import productsController from '../controllers/products.controller.js';
import { upload } from '../utils.js';

const router = Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductById);

router.post('/', upload.single('img'), productsController.register);

router.put('/:id', upload.single('img'), productsController.update);

router.delete('/:id', productsController.deleteProduct);

export default router;