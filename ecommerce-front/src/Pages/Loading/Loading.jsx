import Spinner from 'react-bootstrap/Spinner';
import './Loading.css';

const Loading = ({textLoading}) => {
    return (
        <div className='Loading'>
            <Spinner className='Spinner' animation="border" role="status"></Spinner>
            <span className='LoadingText'>{textLoading ? textLoading : 'Cargando...'}</span>
        </div>
    )
}

export default Loading;