import mongoose from "mongoose";

export default class Product {
    static get collection() {
        return "Products"
    }

    static get schema() {
        return{
            name: { type: String, required: true },
            description: { type: String, required: true },
            img: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
        }
    }
};