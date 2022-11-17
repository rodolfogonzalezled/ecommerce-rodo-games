import User from "../models/User.js";;
import GenericRepository from "./GenericRepository.js";

export default class UserService extends GenericRepository {
    constructor(dao) {
        super(dao, User.collection)
    }
}