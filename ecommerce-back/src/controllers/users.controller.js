import { userService } from "../services/service.js";

const getUsers = async(req,res)=> {
    const result = await userService.getAll();
    res.send({status:"success", payload:result})
}

export default {
    getUsers
}