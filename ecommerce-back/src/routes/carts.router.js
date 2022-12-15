import { Router } from 'express';
import cartsController from '../controllers/carts.controller.js';

const router = Router();

router.get('/', cartsController.getCarts);

router.delete('/:idCart', cartsController.emptyCart);

router.get('/:idCart/products', cartsController.getProductsCart);

router.post('/:idCart/product/:idProd', cartsController.addProductCart);

router.delete('/:idCart/product/:idProd', cartsController.deleteProductsCart);

export default router;