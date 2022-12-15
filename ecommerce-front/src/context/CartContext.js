import { createContext, useContext, useEffect, useState } from "react";
import { ALERT_STATUS } from "../constants/alertStatus";
import CartService from "../Services/cartService";
import { createAlert } from "../Utils/alerts";
import UserContext from "./UserContext";

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState(null)
    const { user } = useContext(UserContext);
    const service = new CartService();
    useEffect(() => {
        getCart();
    }, [user])

    const getCart = () => {
        if (user && user.role === 'user') {
            service.getById(user.cart, callbackSuccessGetCart, callbackError);
        } else {
            setCart(null);
        }
    }

    const addProduct = (idProd, quantity) => {
        service.addProductCart(cart.id, idProd, { quantity }, callbackSuccessAddProduct, callbackError);
    }

    const emptyCart = () => {
        service.emptyCart(cart.id, callbackSuccessEmptyCart, callbackError)
        if (cart.products.length > 0) {
            createAlert(ALERT_STATUS.SUCCESS, '', '🛒 Se ha vaciado el carrito');
        }
    }

    const getQuantity = () => {
        if (cart?.products.length) return cart.products.reduce((acc, el) => acc + el.quantity, 0);
    }

    const subTotal = (idProd) => {
        if (cart?.products.length) return cart.products.filter(item => item.product.id === idProd).reduce((acc, el) => acc + el.product.price * el.quantity, 0)
    }

    const total = () => {
        if (cart?.products.length) return cart.products.reduce((acc, el) => acc + el.product.price * el.quantity, 0);
    }

    const addItem = (idProd, stock, quantity) => {
        if (quantity < stock) {
            quantity += 1;
            addProduct(idProd, quantity)
        } else {
            createAlert(ALERT_STATUS.WARNING, 'Información', 'Usted ha agregado la cantidad máxima de Stock disponible del producto');
        }
    }

    const removeItem = (idProd, quantity) => {
        if (quantity <= 1) {
            service.deleteProductCart(cart.id, idProd, callbackSuccessRemoveItem, callbackError);
        } else {
            quantity -= 1;
            service.addProductCart(cart.id, idProd, { quantity }, callbackSuccessRemoveItem, callbackError);
        }
    }

    const getIsProductInCart = (idProd) => {
        if (cart) {
            return cart.products.find(item => item.product.id === idProd) ? true : false;
        }
    }

    //Callbacks
    const callbackSuccessGetCart = (res) => {
        setCart(res.data.payload);
    };
    const callbackSuccessAddProduct = (res) => {
        createAlert(ALERT_STATUS.SUCCESS, '', '🛒 Producto agregado al carrito exitosamente');
    };
    const callbackSuccessEmptyCart = (res) => {
        setCart(res.data.payload);
    };
    const callbackSuccessRemoveItem = (res) => {
        createAlert(ALERT_STATUS.SUCCESS, '', '🛒 Producto eliminado del carrito exitosamente');
    };
    const callbackError = (error) => {
        createAlert(ALERT_STATUS.ERROR, 'Error', error?.response?.data?.error ?? error.message);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addProduct,
            emptyCart,
            getQuantity,
            subTotal,
            total,
            addItem,
            removeItem,
            getIsProductInCart,
            getCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext