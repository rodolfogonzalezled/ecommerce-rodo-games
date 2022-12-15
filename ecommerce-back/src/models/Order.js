import mongoose, { Schema } from "mongoose";

export default class Order {

    static get collection () {
        return 'Orders';
    }

    static get schema () {
        return {
            user_name: { type: String, required: true },
            email: { type: String, required: true },
            total: { type:Number, required: true },
            number: { type:Number, required: true },
            items : [
                {
                    name: { type: String, required: true },
                    price: { type: String, required: true },
                    img: { type: String, required: true },
                    quantity:{ type:Number, required: true }
                }
            ]
        };
    }
}