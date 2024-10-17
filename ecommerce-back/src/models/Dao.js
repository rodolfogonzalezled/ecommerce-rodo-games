import mongoose from "mongoose";
import User from "./User.js";
import Cart from "./Cart.js";
import Product from "./Product.js";
import Order from "./Order.js";

export default class Dao {
    constructor(config) {
        this.mongoose = mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@serverrodo.nz3ed4l.mongodb.net/${config.mongo.DATABASE}?retryWrites=true&w=majority&appName=ServerRodo`);

        const timestamps = { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

        const userSchema = mongoose.Schema(User.schema, timestamps);
        const cartSchema = mongoose.Schema(Cart.schema, timestamps);
        const productSchema = mongoose.Schema(Product.schema, timestamps);
        const orderSchema = mongoose.Schema(Order.schema, timestamps);

        this.models = {
            [User.collection]: mongoose.model(User.collection, userSchema),
            [Cart.collection]: mongoose.model(Cart.collection, cartSchema),
            [Product.collection]: mongoose.model(Product.collection, productSchema),
            [Order.collection]: mongoose.model(Order.collection, orderSchema)
        }
    }

    getAll = async (options, entity) => {
        if (!this.models[entity]) throw new Error(`La entidad no existe`);
        let result = await this.models[entity].find(options).lean();
        return result;
    }

    findOne = async (options, entity) => {
        if (!this.models[entity]) throw new Error(`La entidad no existe`);
        let result = await this.models[entity].findOne(options).lean();
        return result;
    }

    save = async (document, entity) => {
        if (!this.models[entity]) throw new Error(`La entidad no existe`);
        let result = await this.models[entity].create(document);
        return result;
    }

    update = async (id, document, entity) => {
        if (!this.models[entity]) throw new Error(`La entidad no existe`);
        let result = await this.models[entity].updateOne({ _id: id }, { $set: document });
        return result;
    }

    delete = async (id, entity) => {
        if (!this.models[entity]) throw new Error(`La entidad no existe`);
        let result = await this.models[entity].deleteOne({ _id: id });
        return result;
    }
};