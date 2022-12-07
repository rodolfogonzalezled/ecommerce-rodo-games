import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const RequireAuth = ({ children }) => {
    const { user } = useContext(UserContext);
    if (user === null) {
        return <Navigate to='/login' />;
    }
    return children;
}

export default RequireAuth;