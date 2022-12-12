import { TiShoppingCart } from 'react-icons/ti';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../../Cart/CartWidget/CartWidget.css';
import CartContext from '../../../context/CartContext';

const CartWidget = () => {

    const { cart, getCart, getQuantity } = useContext(CartContext);
    const quantity = getQuantity();

    useEffect(() => {
        getCart();
    }, [cart])

    return (
        <div className='CartWidget'>
            {quantity ?
                <Link to={'/cart'} className='CartWidget'>
                    <TiShoppingCart />
                    <div bg="danger" className='CartCount'>
                        {quantity}
                    </div>
                </Link>
                : null}
        </div>
    );
}

export default CartWidget