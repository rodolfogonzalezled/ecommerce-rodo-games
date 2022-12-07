import { TiShoppingCart } from 'react-icons/ti';
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import '../../Cart/CartWidget/CartWidget.css';

const CartWidget = () => {

    return (
        <div>
                <Link to={'/cart'} className='CartWidget'>
                    <TiShoppingCart />
                    <div bg="danger" className='CartCount'>
                    </div>
                </Link>
        </div>
    )
};

export default CartWidget