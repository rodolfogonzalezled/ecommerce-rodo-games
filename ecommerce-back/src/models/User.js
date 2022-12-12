import mongoose from 'mongoose';

export default class User {
    static get collection() {
        return 'Users';
    }

    static get schema() {
        return {
            first_name: String,
            last_name: String,
            password: String,
            email: String,
            role: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user'
            },
            avatar: String,
            phone: String,
            cart:{
                type:mongoose.SchemaTypes.ObjectId,
                ref: 'Carts'
            }
        }
    }
};