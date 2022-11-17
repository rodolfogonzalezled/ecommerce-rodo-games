import { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import './ProductsListContainer.css';
import ProductService from '../../Services/productsService';
import { createAlert } from '../../Utils/alerts';
import { ALERT_STATUS } from '../../constants/alertStatus';
import ProductList from "../ProductList";

const ProductsListContainer = () => {

    const [products, setProducts] = useState([]);
    const service = new ProductService();

    useEffect(() => {
        service.getAll(callbackSuccessGetProducts, callbackErrorGetProducts);
    }, [])

    const handlerDeleteProduct = (id) => {
        service.delete(id, callbackSuccessDeleteProduct, callbackErrorDeleteProduct);
    };

    // --------------------- Callbacks ---------------------------
    const callbackSuccessGetProducts = (res) => {
        const { data, status } = res;
        setProducts(data.payload);
    };
    const callbackErrorGetProducts = (err) => {
        console.log(err);
    };

    const callbackSuccessDeleteProduct = (res) => {
        createAlert(ALERT_STATUS, 'Producto eliminado', 'Se ha eliminado el producto con éxito');
        service.getAll(callbackSuccessGetProducts, callbackErrorGetProducts);
    };
    const callbackErrorDeleteProduct = (err) => {
        console.log(err);
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