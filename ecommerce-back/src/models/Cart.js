import mongoose, { Schema } from "mongoose";

export default class Cart {

    static get collection () {
        return 'Carts';
    }

    static get schema () {
        return {
            products : [
                {
                    product: {
                        type: Schema.Types.ObjectId,
                        ref: 'Products'
                    },
                    quantity:{
                        type:Number,
                        default:1
                    }
                }
            ]
        };
    }
}