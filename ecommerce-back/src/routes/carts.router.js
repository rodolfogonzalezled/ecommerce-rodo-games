import { Router } from 'express';
import cartsController from '../controllers/carts.controller.js';

const router = Router();

router.post('/', cartsController.saveCart);

router.delete('/:id', cartsController.emptyCart);

router.get('/:id/products', cartsController.getProductsCart);

router.post('/:idCart/product/:idProd', cartsController.addProductCart)

router.delete('/:idCart/product/:idProd', cartsController.deleteProductsCart);

export default router;