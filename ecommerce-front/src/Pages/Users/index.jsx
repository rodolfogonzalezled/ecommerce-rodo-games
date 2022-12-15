import { useEffect, useState } from "react";
import UsersService from "../../Services/UserService.js";
import { ALERT_STATUS } from "../../constants/alertStatus.js";
import { createAlert } from "../../Utils/alerts.js";

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const service = new UsersService();
        service.getUsers(callbackSuccessGetUsers, callbackErrorGetUsers);
    }, [])

    // --------------------- Callbacks ---------------------------
    const callbackSuccessGetUsers = (res) => {
        setUsers(res.data.payload);
        createAlert(ALERT_STATUS, 'Usuarios obtenidos', 'Se han obtenido los usuarios con éxito');
    };
    const callbackErrorGetUsers = (error) => {
        createAlert(ALERT_STATUS.ERROR, 'Error', error?.response?.data?.error ?? error.message);
    };

    return (<>
        <h1>Super Administrador Rodolfo Gonzalez!</h1>
    </>)
};

export default Users;