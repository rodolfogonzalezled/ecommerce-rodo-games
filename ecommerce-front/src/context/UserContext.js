import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ALERT_STATUS } from "../constants/alertStatus";
import SessionService from "../Services/sessionsService";
import { createAlert, createAlertWithCallback } from "../Utils/alerts";
import { isLogged } from "../Utils/session";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [user, setUser] = useState(false);
    useEffect(() => {
        getUser();
    }, [])

    const getUser = () => {
            const service = new SessionService();

            const callbackSuccessRegister = (res) => {
                const user = res.data.payload;
                if(user) setUser(user);
            };
    
            const callbackErrorRegister = (error) => {
                setUser(null);
            };
            service.current(callbackSuccessRegister, callbackErrorRegister)
    }

    const registerUser = (user) => {
        const service = new SessionService();

        const callbackSuccessRegister = (res) => {
            createAlertWithCallback(ALERT_STATUS.SUCCESS, 'Usuario registrado', 'Ahora puede loguearse en la página de ingreso', () => {
                navigation('/login');
            });
        };

        const callbackErrorRegister = (error) => {
            createAlert(ALERT_STATUS.ERROR, 'Error', error?.response?.data?.error ?? error.message);
        };

        service.register({ body: user, callbackSuccess: callbackSuccessRegister, callbackError: callbackErrorRegister })
    }

    const login = (email, password) => {
        const service = new SessionService();
        const sendObject = {
            email,
            password
        }

        const callbackSuccessLogin = res => {
            const { user } = res.data.payload;
            setUser(user);
            navigation('/');
        }

        const callbackErrorLogin = error => {
            createAlert(ALERT_STATUS.ERROR, 'Error', error?.response?.data?.error ?? error.message);
        }

        service.login({ body: sendObject, callbackSuccess: callbackSuccessLogin, callbackError: callbackErrorLogin })
    }

    const logOut = () => {
        const service = new SessionService();
        const callbackSuccessLogin = res => {
            getUser();
            navigation('/login');
        }

        const callbackErrorLogin = error => {
            createAlert(ALERT_STATUS.ERROR, 'Error', error?.response?.data?.error ?? error.message);
        }

        service.logout(callbackSuccessLogin, callbackErrorLogin)
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