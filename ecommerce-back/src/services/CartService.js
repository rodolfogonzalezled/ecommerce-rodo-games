import Cart from "../models/Cart.js";
import GenericRepository from "./GenericRepository.js";

export default class CartService extends GenericRepository {
    constructor(dao) {
        super(dao, Cart.collection)
    }
}