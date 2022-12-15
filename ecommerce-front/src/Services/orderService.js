import { getHeaders } from "../Utils/http.js";
import AxiosClient from "./axiosClient.js";

const { REACT_APP_BASE_URL, REACT_APP_ORDERS_ENDPOINT } = process.env;

export default class OrderService {
    constructor() {
        this.client = new AxiosClient();
    }

    getByUser = (email, callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_ORDERS_ENDPOINT}/${email}`, config: getHeaders(), callbackSuccess, callbackError };
        this.client.makeGetRequest(requestInfo);
    }

    createOrder = (idCart, callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_ORDERS_ENDPOINT}/${idCart}`, body: null, callbackSuccess, callbackError }
        this.client.makePostRequest(requestInfo);
    }
}