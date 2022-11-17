import Product from "../models/Product.js";
import GenericRepository from "./GenericRepository.js";

export default class ProductService extends GenericRepository {
    constructor(dao) {
        super(dao, Product.collection)
    }
}