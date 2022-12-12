import Cart from "../models/Cart.js";
import GenericRepository from "./GenericRepository.js";

export default class CartService extends GenericRepository {
    constructor(dao) {
        super(dao, Cart.collection)
    }

    getByWithPopulate = async (params) => {
        let result = await this.dao.models[Cart.collection].findOne(params).populate('products.product');
        return result;
    }
}