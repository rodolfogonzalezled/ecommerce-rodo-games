import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const RequireAuth = ({ children, onlyAdmin, onlyUser }) => {
    const { user } = useContext(UserContext);
    if (user === null) {
        return <Navigate to='/login' />;
    }

    if (onlyAdmin) {
        if (user.role != 'admin')
            return <Navigate to='/' />;
    } 
    
    if( onlyUser) {
        if (user.role != 'user')
            return <Navigate to='/' />;
    }

    return children;
}

export default RequireAuth;