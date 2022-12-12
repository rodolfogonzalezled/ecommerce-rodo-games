import ProductsDTO from "./products.dto.js";

export default class CartsDTO {
    constructor(cart) {
        this.id = cart._id ?? cart.id;
        this.products = cart.products.map(prod => {
            return {
                product: new ProductsDTO(prod.product),
                quantity: prod.quantity
            };
        });
    }
}