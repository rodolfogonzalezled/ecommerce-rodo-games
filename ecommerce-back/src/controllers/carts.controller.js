import CartsDTO from "../dtos/carts.dto.js";
import { cartService, productService } from "../services/service.js";

const getCarts = async (req, res) => {
    try {
        const carts = await cartService.getAll();
        const cartsParsed = carts.map(cart => new CartsDTO(cart));
        res.send({ status: "success", payload: cartsParsed })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

const addProductCart = async (req, res) => {
    try {
        let { idCart, idProd } = req.params;
        let { quantity } = req.body;

        let cart = await cartService.getBy({ _id: idCart });
        if (!cart) return res.status(404).send({ status: "error", error: "Carrito no encontrado" });

        let product = await productService.getBy({ _id: idProd });
        if (!product) return res.status(404).send({ status: "error", error: "Producto no encontrado" });

        if (product.stock === 0) return res.status(400).send({ status: "error", error: "El Producto que desea agregar no posee stock" });

        if (product.stock < quantity) {
            return res.status(400).send({ status: "error", error: "El Producto que desea agregar no posee stock disponible para la cantidad solicitada" });
        }

        let productIndex = cart.products.findIndex(prod => prod.product._id == idProd);

        if (productIndex != -1) {
            cart.products[productIndex].quantity = quantity;
        } else {
            cart.products.push({ product: idProd, quantity });
        }

        await cartService.update(idCart, cart);
        res.send({ status: "success", message: "Producto agregado al carrito" })

    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

const emptyCart = async (req, res) => {
    try {
        let { idCart } = req.params;
        let cart = await cartService.getBy({ _id: idCart });
        if (!cart) return res.status(404).send({ status: "error", error: "Carrito no encontrado" });

        cart.products = [];
        await cartService.update(idCart, cart);
        res.send({ status: "success", message: "Carrito vacío" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

const getProductsCart = async (req, res) => {
    try {
        let result = await cartService.getByWithPopulate({ _id: req.params.idCart });
        if (!result) return res.status(404).send({ status: "error", error: "Carrito no encontrado" });
        let parsedCart = new CartsDTO(result);
        res.send({ status: "success", payload: parsedCart })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

const deleteProductsCart = async (req, res) => {
    try {
        let { idCart, idProd } = req.params;

        let cart = await cartService.getBy({ _id: idCart });
        if (!cart) return res.status(404).send({ status: "error", error: "Carrito no encontrado" });

        let product = await productService.getBy({ _id: idProd });
        if (!product) return res.status(404).send({ status: "error", error: "Producto no encontrado" });

        let productIndex = cart.products.findIndex(prod => prod.product._id == idProd);

        if (productIndex != -1) {
            cart.products = cart.products.filter(element => element.product._id.toString() !== idProd);
            await cartService.update(idCart, cart);
            res.send({ status: "success", message: "Producto eliminado del carrito" })
        } else {
            return res.status(400).send({ error: "Producto no encontrado en el carrito" })
        }
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

export default {
    getCarts,
    addProductCart,
    emptyCart,
    getProductsCart,
    deleteProductsCart
};