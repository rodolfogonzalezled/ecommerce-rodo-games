
import config from "../config/config.js";
import Dao from "../models/Dao.js";
import CartService from "./CartService.js";
import OrderService from "./OrderService.js";
import ProductService from "./ProductService.js";
import UserService from "./UserService.js";

const dao = new Dao(config);

export const userService = new UserService(dao);
export const productService = new ProductService(dao);
export const cartService = new CartService(dao);
export const orderService = new OrderService(dao);
