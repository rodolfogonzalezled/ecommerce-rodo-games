import { useContext } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CartContext from '../../../context/CartContext'
import ItemCount from '../../ItemCount/ItemCount'
import '../../Product/ProductDetail/ProductDetail.css'
import UserContext from "../../../context/UserContext"

const ProductDetail = ({ id, name, img, description, price, stock }) => {
    const { addProduct, getIsProductInCart } = useContext(CartContext)
    const onAdd = (count) => {
        addProduct(id, count)
    }
    const { user } = useContext(UserContext)
    return (
        <div>
            <Container className="ProductDetail">
                <Row>
                    <Col xs={12} md={6}>
                        <picture className="ContainerImg">
                            <img src={img} alt={name} className="ProductDetailImg" />
                        </picture>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className='ProductDetailTitle'>{name}</div>
                        <div className='ProductDetailText'>
                            <div>
                                <b>Precio:</b> $ {price}
                            </div>
                            <div>
                                <b>Descripción:</b> {description}
                            </div>
                            <div>
                                {stock > 0 ? <> <b>Stock disponible:</b> {stock} </> : <b>Sin stock disponible</b>}
                            </div>
                        </div>
                        <div className='DetailCount'>
                            {(user?.role === 'user' && stock > 0) && <>
                                {getIsProductInCart(id) ? <Button as={Link} to='/cart' variant="outline-dark">Ver carrito</Button> : <ItemCount stock={stock} initialCount={1} onAdd={onAdd} />}
                            </>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProductDetail
