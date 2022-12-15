import mongoose from 'mongoose';

export default class User {
    static get collection() {
        return 'Users';
    }

    static get schema() {
        return {
            first_name: { type: String, required: true },
            last_name: { type: String, required: true },
            password: { type: String, required: true },
            email: { type: String, required: true },
            role: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user'
            },
            avatar: { type: String, required: true },
            phone: { type: String, required: true },
            cart:{
                type:mongoose.SchemaTypes.ObjectId,
                required: true,
                ref: 'Carts'
            }
        }
    }
};