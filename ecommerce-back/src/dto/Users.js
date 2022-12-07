export default class UserDtoToken {
    constructor (user) {
        this.id = user._id;
        this.email = user.email;
        this.role = user.role;
        this.cart = user.cart;
        this.userName = `${user.first_name} ${user.last_name}`;
        this.avatar = user.avatar;
    }
    toObject = () => {
        return {
            id: this.id,
            email: this.email,
            role: this.role,
            cart: this.cart,
            userName: this.userName,
            avatar: this.avatar
        }
    }
}