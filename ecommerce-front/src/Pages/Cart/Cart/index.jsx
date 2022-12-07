import { Button, Container, Row, Col } from 'react-bootstrap';
import '../Cart/Cart.css';

const cart = () => {
    return (
        <div>
            <Container className='RegisterContainer'>
                <h1 className="CartTitle">Carrito de compras</h1>

                <div className="Cart">
                    <div>
                        <Row className="CartContainer">
                            <Col xs={5}>
                                <p> Producto </p>
                            </Col>
                            <Col xs={3} className="CartAddDelete">
                                <p> Cantidad </p>
                            </Col>
                            <Col xs={2} className="CartPrice">
                                <p> Precio Unitario </p>
                            </Col>
                            <Col xs={2} className="CartPrice">
                                <p> Sub-Total </p>
                            </Col>
                        </Row>


                    </div>
                    <Row className="CartPrice">
                        <Col>
                            {/* <b> Total: $ {total()} </b> */}
                            <b> Total: $ { } </b>
                        </Col>
                    </Row>
                </div>
                <div className="CartBtn">
                    {/* <Button onClick={clearCart} variant="outline-danger"> Vaciar carrito </Button>
                <Button onClick={validateUser} variant="outline-success"> Terminar compra </Button> */}
                    <Button variant="outline-danger"> Vaciar carrito </Button>
                    <Button variant="outline-success"> Terminar compra </Button>
                </div>


            </Container>
        </div>)
};

export default cart;

{/* <div>
            {showAlert &&
                <AlertConfirmation
                    message={`Continuar compra como ${user.email}`}
                    textOk={'Continuar'}
                    textCancel={'Cambiar de usuario'}
                    acceptFn={() => createOrder()}
                    cancelFn={() => {
                        logOut();
                        navigate('/login');
                    }}
                />}
            <h1 className="CartTitle">Carrito de Compras</h1>
            <div className="Cart">
                <div>
                    <Row className="CartContainer">
                        <Col xs={5}>
                            <p> Producto </p>
                        </Col>
                        <Col xs={3} className="CartAddDelete">
                            <p> Cantidad </p>
                        </Col>
                        <Col xs={2} className="CartPrice">
                            <p> Precio Unitario </p>
                        </Col>
                        <Col xs={2} className="CartPrice">
                            <p> Sub-Total </p>
                        </Col>
                    </Row>


                    {cart.map(prod =>
                        <div>
                            <Row className="CartContainer">
                                <Col xs={5}>
                                    <h5>{prod.name}</h5>
                                </Col>
                                <Col xs={3} className="CartAddDelete">
                                    <div className="CartBtn">
                                        <Button variant="outline-danger" onClick={() => { removeItem(prod.id) }}> ➖ </Button>
                                        <p> {prod.quantity} </p>
                                        <Button variant="outline-success" onClick={() => { addItem(prod.id) }}> ➕ </Button>
                                    </div>
                                </Col>
                                <Col xs={2} className="CartPrice">
                                    <h5>{prod.price}</h5>
                                </Col>
                                <Col xs={2} className="CartPrice">
                                    <h5>{subTotal(prod.id)}</h5>
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
                <Button onClick={clearCart} variant="outline-danger"> Vaciar carrito </Button>
                <Button onClick={validateUser} variant="outline-success"> Terminar compra </Button>
            </div>
        </div> */}