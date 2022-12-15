export default class UserDtoToken {
    constructor (user) {
        this.id = user._id;
        this.email = user.email;
        this.role = user.role;
        this.cart = user.cart;
        this.user_name = `${user.first_name} ${user.last_name}`;
        this.avatar = user.avatar;
        this.phone = user.phone;
    }
    toObject = () => {
        return {
            id: this.id,
            email: this.email,
            role: this.role,
            cart: this.cart,
            user_name: this.user_name,
            avatar: this.avatar,
            phone: this.phone
        }
    }
}