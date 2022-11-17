import ProductItem from '../ProductItem';
import './ProductList.css';

const ProductList = ({ products, handlerDeleteProduct }) => {

    return (
        <div className='ItemContainer'>
            {products.map(product => <ProductItem key={product.id} {...product} handlerDeleteProduct={handlerDeleteProduct} />)}
        </div>
    );
}

export default ProductList;