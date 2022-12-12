import OrdersDTO from "../dtos/orders.dto.js";
import mailingService from "../services/Mailing.js";
import { cartService, orderService, productService, userService } from "../services/service.js";

const getOrders = async (req, res) => {
    try {
        let { email } = req.params;
        let orders = await orderService.getAll({ email: email });
        if (!orders) return res.status(404).send({ status: "error", error: "No existen ordenes registradas para el usuario" });
        const ordersParsed = orders.map(order=> new OrdersDTO(order));

        res.send({ status: "success", payload: ordersParsed })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

const saveOrder = async (req, res) => {
    try {
        let { idUser } = req.params;
        const user = await userService.getBy({ _id: idUser });
        if (!user) return res.status(404).send({ status: "error", error: "Usuario no encontrado" });

        const cart = await cartService.getByWithPopulate({ _id: user.cart });
        if (!cart) return res.status(404).send({ status: "error", error: "Carrito no encontrado" });

        if (!cart.products.length) return res.status(404).send({ status: "error", error: "No posee productos en el carrito para generar una orden de compra" });

        let precioTotal = 0;
        let items = [];
        cart.products.map(prod => {
            precioTotal += prod.product.price * prod.quantity;
            items.push({
                name: prod.product.name,
                price: prod.product.price,
                img: prod.product.img,
                quantity: prod.quantity
            })
        });

        const newOrder = {
            full_name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            total: precioTotal,
            number: await orderService.getNumberOrder(),
            items: items
        }

        let result = await orderService.save(newOrder);
        sendMail(result._id);

        //actualizar stock de productos
        cart.products.forEach(async (prod) => {
            await productService.update(prod.product._id, { stock: prod.product.stock - prod.quantity });
        });

        //vaciar Carrito
        cart.products = [];
        await cartService.update(cart.id, cart);

        res.send({ status: "success", message: "Orden creada" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

const sendMail = async (idOrder) => {
    let order = await orderService.getBy({ _id: idOrder });

    let subject = `Nuevo pedido de ${order.full_name}, ${order.email}`;

    let html = `
        <tr>
            <td align="center" style="width: 100%; font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                Gracias por su compra!
                </h2>
            </td>
        </tr>`;
    html += '<ul style="list-style: none;">';

    order.items.forEach(item => {
        let subtotal = item.price * item.quantity;
        html += `
            <table style="width: 100%; max-width:1080px; text-align: center; justify-content: space-between;" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr style="width: 100%;">
                    <td align="left" style="padding-top: 20px;">
                        <table cellspacing="0" cellpadding="0" border="0" width="100%" style="width: 100%; list-style: none">
                            <tr style="list-style: none; width: 100%">
                                <td width="3%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                    <img style="border-radius: 8%; height: 5em; border: solid 1px" src='${item.img}'>
                                </td>
                                <td width="40%" align="left" style="text-align: left; font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                    <div><b>Nombre:</b> ${item.name}</div>
                                </td>
                                <td width="27%" align="right" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                    <div><b>Precio:</b> $ ${item.price}</div>
                                </td>
                                <td width="3%" align="right" style="text-align: center; font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                    <div><b>Cantidad:</b> ${item.quantity}</div>
                                </td>
                                <td width="27%" align="right" style="text-align: rigth; font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                    <div><b>Subtotal:</b> $ ${subtotal} </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>`
    });
    html += '</ul>';
    html += `<tr>
        <td align="left" style="padding-top: 20px;">
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                    <td width="70%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                        TOTAL
                    </td>
                    <td width="30%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                        <h3><b>Total a pagar: </b> $ ${order.total} </h3>
                    </td>
                </tr>
            </table>
        </td>
    </tr>`

    const email = new mailingService();
    email.sendMail({
        from: 'Ecommerce Rodolfo',
        to: order.email,
        subject,
        html
    });
}

export default {
    saveOrder,
    getOrders
};