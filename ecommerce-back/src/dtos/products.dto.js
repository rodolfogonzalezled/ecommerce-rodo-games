export default class ProductsDTO {
    constructor(product) {
        this.id = product._id;
        this.name = product.name;
        this.description = product.description;
        this.img = product.img;
        this.price = product.price;
        this.stock = product.stock;
    }
}