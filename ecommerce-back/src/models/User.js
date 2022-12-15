import mongoose from 'mongoose';

export default class User {
    static get collection() {
        return 'Users';
    }

    static get schema() {
        return {
            first_name: { type: String, min: 3, max: 100, required: true },
            last_name: { type: String, min: 3, max: 100, required: true },
            password: { type: String, min: 6, max: 16,required: true },
            email: { type: String, min: 6, max: 100, unique: true, required: true },
            role: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user'
            },
            avatar: { type: String, required: true },
            phone: { type: String, max: 20, required: true },
            cart:{
                type:mongoose.SchemaTypes.ObjectId,
                required: true,
                ref: 'Carts'
            }
        }
    }
};