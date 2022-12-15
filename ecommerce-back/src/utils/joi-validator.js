import joi from "joi";

const product = joi.object({
    name: joi.string().min(2).max(100).required(),
    description: joi.string().max(100).required(),
    img: joi.string().required(),
    price: joi.number().positive().required(),
    stock: joi.number().integer().positive().required(),
});

const user = joi.object({
    first_name: joi.string().min(3).max(100).required(),
    last_name: joi.string().min(3).max(100).required(),
    password: joi.string().min(6).max(16).required(),
    email: joi.string().email().required(),
    avatar: joi.string().required(),
    phone: joi.string().max(20).required(),
    cart: joi.required()
});

const order = joi.object({
    user_name: joi.string().required(),
    email: joi.string().required(),
    total: joi.number().positive().required(),
    number: joi.number().integer().positive().required(),
    items: joi.array().items(joi.object({
        name: joi.string().required(),
        price: joi.number().positive().required(),
        img: joi.string().required(),
        quantity: joi.number().integer().positive().required(),
    }))
});

export const JOI_VALIDATOR = {
    product,
    user,
    order
};
