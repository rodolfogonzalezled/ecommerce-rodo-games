import { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import '../ProductListContainer/ProductsListContainer.css';
import ProductService from '../../../Services/productsService';
import { createAlert } from '../../../Utils/alerts';
import { ALERT_STATUS } from '../../../constants/alertStatus';
import ProductList from "../../Product/ProductList";

const ProductsListContainer = () => {
    const [products, setProducts] = useState([]);
    const service = new ProductService();

    useEffect(() => {
        service.getAll(callbackSuccessGetProducts, callbackError);
    }, [])

    const handlerDeleteProduct = (id) => {
        service.delete(id, callbackSuccessDeleteProduct, callbackError);
    };

    // --------------------- Callbacks ---------------------------
    const callbackSuccessGetProducts = (res) => {
        setProducts(res.data.payload);
    };
    const callbackSuccessDeleteProduct = (res) => {
        createAlert(ALERT_STATUS.SUCCESS, 'Producto eliminado', 'Se ha eliminado el producto con éxito');
        service.getAll(callbackSuccessGetProducts, callbackError);
    };
    const callbackError = (error) => {
        createAlert(ALERT_STATUS.ERROR, 'Error', error?.response?.data?.error ?? error.message);
    };

    return (
        <Container>
            <div>
                {products.length === 0 ? <h1 className='NoProducts'> No se encontraron productos </h1> : <ProductList products={products} handlerDeleteProduct={handlerDeleteProduct} />}
            </div>
        </Container>
    )
}

export default ProductsListContainer;