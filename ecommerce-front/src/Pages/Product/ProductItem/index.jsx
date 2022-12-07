import { Link } from "react-router-dom";
import { Card, Button, Col } from 'react-bootstrap'
import '../ProductItem/ProductItem.css'

const Item = ({ _id, name, price, img, handlerDeleteProduct }) => {

    return (
        <Col xs={10} md={4}>
            <div className='CardInitial'>
                <div className='products'>
                    <Card.Img bsPrefix='ProductsImg' src={img} />
                    <Card.Body className='ProductsInfo'>
                        <Card.Title>
                            <h4>{name}</h4>
                        </Card.Title>
                        <Button className="btnItem" as={Link} to={`/product/${_id}`} variant="outline-success">Ver detalle</Button>
                        <Button className="btnItem" as={Link} to={`/product/${_id}/edit`} variant="outline-success">Editar</Button>
                        <Button className="btnItem" variant="outline-success" onClick={() => handlerDeleteProduct(_id)} >Eliminar</Button>
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