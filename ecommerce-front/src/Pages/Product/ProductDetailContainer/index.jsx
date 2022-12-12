import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ALERT_STATUS } from '../../../constants/alertStatus';
import ProductService from '../../../Services/productsService';
import { createAlert } from '../../../Utils/alerts';
import ProductDetail from '../../Product/ProductDetail';

const ProductDetailContainer = () => {
    const [product, setProduct] = useState();
    const { id } = useParams();
    const navigation = useNavigate();

    useEffect(() => {
        const service = new ProductService();
        service.getById(id, callbackSuccessGetProduct, callbackErrorGetProduct);
    }, [])

    // --------------------- Callbacks ---------------------------
    const callbackSuccessGetProduct = (res) => {
        const { data, status } = res;
        setProduct(data.payload);
    };
    const callbackErrorGetProduct = (error) => {
        createAlert(ALERT_STATUS.ERROR, 'Error', error?.response?.data?.error ?? error.message);
        navigation('/');
    };

    if (product) {
        return (
            <div>
                <ProductDetail {...product} />
            </div>
        )
    }
}

export default ProductDetailContainer