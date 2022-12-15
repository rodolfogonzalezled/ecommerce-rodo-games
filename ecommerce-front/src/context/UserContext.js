import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ALERT_STATUS } from "../constants/alertStatus";
import SessionService from "../Services/sessionsService";
import { createAlert, createAlertWithCallback } from "../Utils/alerts";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const service = new SessionService();
    const navigation = useNavigate();
    const [user, setUser] = useState(false);
    useEffect(() => {
        getUser();
    }, [])

    const getUser = () => {
        service.current(callbackSuccessGetCurrentUser, callbackErrorGetCurrentUser);
    };

    const registerUser = (user) => {
        service.register(user, callbackSuccessRegister, callbackError);
    }

    const login = (email, password) => {
        const sendObject = {
            email,
            password
        }
        service.login(sendObject, callbackSuccessLogin, callbackError)
    }

    const logOut = () => {
        service.logout(callbackSuccessLogOut, callbackError)
    }

    //Callbacks
    const callbackSuccessGetCurrentUser = (res) => {
        const user = res.data.payload;
        if (user) setUser(user);
    };
    const callbackErrorGetCurrentUser = (error) => {
        setUser(null);
    };
    const callbackSuccessRegister = (res) => {
        createAlertWithCallback(ALERT_STATUS.SUCCESS, 'Usuario registrado', 'Ahora puede loguearse en la página de ingreso', () => {
            navigation('/login');
        });
    };
    const callbackSuccessLogin = res => {
        setUser(res.data.payload);
        navigation('/');
    }
    const callbackSuccessLogOut = res => {
        setUser(null);
        navigation('/login');
    }
    const callbackError = error => {
        createAlert(ALERT_STATUS.ERROR, 'Error', error?.response?.data?.error ?? error.message);
    }
    return (
        <UserContext.Provider value={{
            user,
            registerUser,
            login,
            logOut
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext; 