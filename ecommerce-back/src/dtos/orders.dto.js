export default class OrdersDTO {
    constructor(order) {
        this.id = order._id;
        this.full_name = order.full_name;
        this.email = order.email;
        this.total = order.total;
        this.number = order.number;
        this.created_at = order.created_at;
        this.items = order.items.map(item => {
            return {
                name: item.name,
                price: item.price,
                img: item.img,
                quantity: item.quantity
            };
        });
    }
}