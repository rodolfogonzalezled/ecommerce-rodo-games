import { getHeaders } from "../Utils/http.js";
import AxiosClient from "./axiosClient.js";

const { REACT_APP_BASE_URL, REACT_APP_CARTS_ENDPOINT } = process.env;

export default class CartService {
    constructor() {
        this.client = new AxiosClient();
    }

    getById = (id, callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_CARTS_ENDPOINT}/${id}/products`, config: getHeaders(), callbackSuccess, callbackError };
        this.client.makeGetRequest(requestInfo);
    }

    addProductCart = (idCart, idProd, body, callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_CARTS_ENDPOINT}/${idCart}/product/${idProd}`, body, callbackSuccess, callbackError }
        this.client.makePostRequest(requestInfo);
    }

    deleteProductCart = (idCart, idProd, callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_CARTS_ENDPOINT}/${idCart}/product/${idProd}`, callbackSuccess, callbackError }
        this.client.makeDeleteRequest(requestInfo);
    }

    emptyCart = (idCart, callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_CARTS_ENDPOINT}/${idCart}`, callbackSuccess, callbackError }
        this.client.makeDeleteRequest(requestInfo);
    }
}