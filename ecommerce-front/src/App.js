import React, { Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from './context/UserContext';
import RequireAuth from './Pages/RequireAuth/RequireAuth';
import Loading from './Pages/Loading/Loading';

const Users = React.lazy(() => import('./Pages/Users'));
const Register = React.lazy(() => import('./Pages/Register'));
const Login = React.lazy(() => import('./Pages/Login'));
const Cart = React.lazy(() => import('./Pages/Cart/Cart'));
const Home = React.lazy(() => import('./Pages/Home'));
const NavBar = React.lazy(() => import('./Pages/NavBar'));
const ProductDetail = React.lazy(() => import('./Pages/Product/ProductDetailContainer'));
const ProductEdit = React.lazy(() => import('./Pages/Product/ProductEdit'));

function App() {
    const { user } = useContext(UserContext);
    if (user === false) {
        return (<div><Loading /></div>);
    }

    return (
        <Suspense fallback="Loading...">
            {/* <UserContextProvider> */}
                <NavBar />
                <Routes>
                {/* <Route element={<PrivateRoute isLogged={isLogged()} />}> */}
                        <Route path="/" element={<Home />} />;
                        <Route path="/users" element={<Users />} />
                        <Route path='/new-product' element={ <RequireAuth><ProductEdit /></RequireAuth>} />
                        <Route path='/product/:id/edit' element={ <RequireAuth><ProductEdit /></RequireAuth>} />
                        <Route path="/cart" element={ <RequireAuth><Cart /></RequireAuth>} />
                    {/* </Route> */}
                    {/* <Route element={<PublicRoute isLogged={isLogged()} />}> */}
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path='/product/:id' element={<ProductDetail />} />
                    {/* </Route> */}
                </Routes>
            {/* </UserContextProvider> */}
        </Suspense>
    );
}

export default App;