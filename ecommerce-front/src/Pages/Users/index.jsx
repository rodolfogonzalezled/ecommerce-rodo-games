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
        const { data, status } = res;
        setUsers(data.payload);
        createAlert(ALERT_STATUS, 'Usuarios obtenidos', 'Se han obtenido los usuarios con éxito');
    };
    const callbackErrorGetUsers = (err) => {
        console.log(err);
    };

    return (<>
        <h1>Hola Rodolfo Gonzalez!</h1>
    </>)
};

export default Users;