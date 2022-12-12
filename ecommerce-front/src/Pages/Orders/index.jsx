import { useContext, useEffect, useState } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import UserContext from '../../context/UserContext';
import OrderService from '../../Services/orderService';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            getOrders();
        }
    }, [user])

    const getOrders = () => {
        const service = new OrderService();
        service.getByUser(user.email, callbackSuccesGetOrders, callbackErrorGetOrders);
    };

    const callbackSuccesGetOrders = (res) => {
        const { data, status } = res;
        setOrders(data.payload)
    };
    const callbackErrorGetOrders = (err) => {
        console.log(err);
    };

    if (orders) {
        return (
            <div>
                <h1 className="OrderTitle">Mis Compras</h1>
                {orders.map(order =>
                    <Card className="OrderContainer" key={order.id}>
                        <Card.Header>
                            <h4 className='DetailOrderTittle'><b>Detalle de la compra</b></h4>
                            <div className='OrderDetail'>
                                <div>
                                    <h6><b>Nombre de Usuario: </b> {order.full_name}</h6>
                                    <h6><b>Email: </b> {order.email}</h6>
                                </div>
                                <div>
                                    <h6><b>Orden de compra #</b> {order.number}</h6>
                                    <h6><b>Comprado el día: </b>{new Date(order.created_at).toLocaleDateString()}</h6>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {order.items.map(item =>
                                    <ListGroup.Item key={item.name}>
                                        <Row>
                                            <Col xs={2}>
                                                <img src={item.img} alt={item.img} className="ItemImg" />
                                            </Col>
                                            <Col xs={4}>
                                                <h6>{item.name}</h6>
                                            </Col>
                                            <Col xs={3} >
                                                <h6>{item.quantity} {item.quantity > 1 ? 'Unidades' : 'Unidad'}</h6>
                                            </Col>
                                            <Col xs={3}>
                                                <h6>$ {item.price} C/U</h6>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <h6><b>Monto total de la compra: </b> ${order.total}</h6>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                )}
            </div>
        )
    }
}

export default Orders;