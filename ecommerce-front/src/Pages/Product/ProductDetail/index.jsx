import { Row, Col, Container, Button } from 'react-bootstrap'
import '../../Product/ProductDetail/ProductDetail.css'

const ProductDetail = ({ _id, name, img, description, price, stock }) => {
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
                                <b>Descripcion:</b> {description}
                            </div>
                            <div>
                                <b>Stock disponible:</b> {stock}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProductDetail
