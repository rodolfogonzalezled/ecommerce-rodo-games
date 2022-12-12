import { Link } from "react-router-dom";
import { Card, Button, Col } from 'react-bootstrap'
import '../ProductItem/ProductItem.css'
import { useContext } from "react";
import UserContext from "../../../context/UserContext";

const Item = ({ id, name, price, img, handlerDeleteProduct }) => {
    const { user } = useContext(UserContext)
    return (
        <Col xs={10} md={4}>
            <div className='CardInitial'>
                <div className='products'>
                    <Card.Img bsPrefix='ProductsImg' src={img} />
                    <Card.Body className='ProductsInfo'>
                        <Card.Title>
                            <h5>{name}</h5>
                        </Card.Title>
                        <Button className="btnItem" as={Link} to={`/product/${id}`} variant="outline-dark">Ver detalle</Button>
                        {user?.role === 'admin' && <>
                            <Button className="btnItem" as={Link} to={`/product/${id}/edit`} variant="outline-dark">Editar</Button>
                            <Button className="btnItem" variant="outline-dark" onClick={() => handlerDeleteProduct(id)} >Eliminar</Button>
                        </>}
                        <Card.Text className='CardText'>
                            <b> Precio: </b> ${price}
                        </Card.Text>
                    </Card.Body>
                </div>
            </div>
        </Col>
    )
}

export default Item;