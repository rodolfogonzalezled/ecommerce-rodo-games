import config from "../config/config.js";
import UserDtoToken from "../dto/Users.js"
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    let user;
    if (req.user.role !== "admin") {
        user = new UserDtoToken(req.user).toObject();
    } else {
        user = req.user;
    }

    const token = jwt.sign(user, config.jwt.SECRET, { expiresIn: "1h" });
    return res.cookie(config.jwt.COOKIE, token, { maxAge: 3600000 }).send({ status: "success", payload: { user } });
}

const logout = async (req, res) => {
    res.clearCookie(config.jwt.COOKIE);
    res.send({ status: "success", message: "Sesión cerrada" })
}

const current = async (req, res) => {
    let user;
    if (req.user.role !== "admin") {
        user = new UserDtoToken(req.user).toObject();
    } else {
        user = req.user;
    }
    res.send({ status: "success", payload: user });
}

export default {
    login,
    logout,
    current
}