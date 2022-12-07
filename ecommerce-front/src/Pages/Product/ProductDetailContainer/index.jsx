import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductService from '../../../Services/productsService';
import ProductDetail from '../../Product/ProductDetail';

const ProductDetailContainer = () => {
    const [product, setProduct] = useState();
    const { id } = useParams();

    useEffect(() => {
        const service = new ProductService();
        service.getById(id, callbackSuccessGetProduct, callbackErrorGetProduct);
    }, [])

    // --------------------- Callbacks ---------------------------
    const callbackSuccessGetProduct = (res) => {
        const { data, status } = res;
        setProduct(data.payload);
    };
    const callbackErrorGetProduct = (err) => {
        console.log(err);
    };

    if (!product) {
        return (<h1 className='NoProducts'> No se encontraron productos </h1>);
    }

    return (
        <div>
            <ProductDetail {...product} />
        </div>
    )
}

export default ProductDetailContainer