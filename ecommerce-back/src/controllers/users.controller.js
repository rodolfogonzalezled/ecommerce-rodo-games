import { userService } from "../services/service.js";
import UserDtoToken from "../dtos/users.dto.js"

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        const usersParsed = users.map(user=> new UserDtoToken(user));
        res.send({ status: "success", payload: usersParsed })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

export default {
    getUsers
}