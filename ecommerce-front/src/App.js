import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = React.lazy(() => import('./Pages/Users'));
const Register = React.lazy(() => import('./Pages/Register'));
const Login = React.lazy(() => import('./Pages/Login'));
const ProductListContainer = React.lazy(() => import('./Pages/ProductListContainer'));
const NavBar = React.lazy(() => import('./Pages/NavBar'));
const ProductDetail = React.lazy(() => import('./Pages/ProductDetailContainer'));
const ProductEdit = React.lazy(() => import('./Pages/ProductEdit'));
function App() {
    return (
        <Suspense fallback="Loading...">
            <NavBar />
            <Routes>
                <Route path='/' element={<ProductListContainer />} />;
                <Route path="/users" element={<Users />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path='/product/:id' element={<ProductDetail />} />;
                <Route path='/new-product' element={<ProductEdit />} />;
                <Route path='/product/:id/edit' element={<ProductEdit />} />;
            </Routes>
        </Suspense>
    );
}

export default App;