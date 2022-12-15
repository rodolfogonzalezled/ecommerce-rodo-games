import mongoose from "mongoose";

export default class Product {
    static get collection() {
        return "Products"
    }

    static get schema() {
        return{
            name: { type: String, required: true, min: 2, max: 100},
            description: { type: String, required: true, max: 100 },
            img: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
        }
    }
};