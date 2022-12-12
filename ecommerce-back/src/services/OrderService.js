import Order from "../models/Order.js";
import GenericRepository from "./GenericRepository.js";

export default class OrderService extends GenericRepository {
    constructor(dao) {
        super(dao, Order.collection)
    }

    getNumberOrder = async () => {
        let result = await this.dao.models[Order.collection].find().countDocuments();
        return result + 1;
    }
}