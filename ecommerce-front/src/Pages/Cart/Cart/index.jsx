import { useContext } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { ALERT_STATUS } from '../../../constants/alertStatus';
import CartContext from '../../../context/CartContext';
import UserContext from '../../../context/UserContext';
import OrderService from '../../../Services/orderService';
import { createAlert } from '../../../Utils/alerts';
import '../Cart/Cart.css';

const Cart = () => {
    const { user } = useContext(UserContext);
    const { cart, addItem, removeItem, subTotal, total, emptyCart } = useContext(CartContext);

    const createOrder = () => {
        if (cart.products.length > 0 && user) {
            const service = new OrderService();
            service.createOrder(user.cart, callbackSuccessCreateOrder, callbackErrorCreateOrder);
        }
    };
    
    //Callbacks
    const callbackSuccessCreateOrder = (res) => {
        createAlert(ALERT_STATUS.SUCCESS, '', '🛒 Su compra se ha realizado exitosamente');
    };
    const callbackErrorCreateOrder = (error) => {
        createAlert(ALERT_STATUS.ERROR, 'Error', error?.response?.data?.error ?? error.message);
    };

    if (cart) {
        return (
            <div>
                <h1 className="CartTitle">Carrito de Compras</h1>
                <div className="Cart">
                    <div>
                        <Row className="CartContainer">
                            <Col xs={1}>
                            </Col>
                            <Col xs={4}>
                                <b>Producto</b>
                            </Col>
                            <Col xs={3} className="CartAddDelete">
                                <b>Cantidad </b>
                            </Col>
                            <Col xs={2} className="CartPrice">
                                <b> Precio Unitario </b>
                            </Col>
                            <Col xs={2} className="CartPrice">
                                <b> Sub-Total </b>
                            </Col>
                        </Row>
                        {cart.products.map(element =>
                            <div key={element.id}>
                                <Row className="CartContainer">
                                    <Col xs={1}>
                                        <img src={element.product.img} className="CartImg" />
                                    </Col>
                                    <Col xs={4}>
                                        <h5>{element.product.name}</h5>
                                    </Col>
                                    <Col xs={3} className="CartAddDelete">
                                        <div className="CartBtn">
                                            <Button variant="outline-danger" onClick={() => { removeItem(element.product.id, element.quantity) }}> ➖ </Button>
                                            <p> {element.quantity} </p>
                                            <Button variant="outline-success" onClick={() => { addItem(element.product.id, element.product.stock, element.quantity) }}> ➕ </Button>
                                        </div>
                                    </Col>
                                    <Col xs={2} className="CartPrice">
                                        <h5>{element.product.price}</h5>
                                    </Col>
                                    <Col xs={2} className="CartPrice">
                                        <h5>{subTotal(element.product.id)}</h5>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </div>
                    <Row className="CartPrice">
                        <Col>
                            <b> Total: $ {total()} </b>
                        </Col>
                    </Row>
                </div>
                <div className="CartBtn">
                    <Button onClick={emptyCart} variant="outline-danger"> Vaciar carrito </Button>
                    <Button onClick={createOrder} variant="outline-success"> Terminar compra </Button>
                </div>
            </div>
        )
    }

    return (
        <div>NO HAY PRODUCTOS</div>
    )
};

export default Cart;