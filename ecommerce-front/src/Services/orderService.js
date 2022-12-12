import { getHeaders } from "../Utils/http.js";
import AxiosClient from "./axiosClient.js";

const { REACT_APP_BASE_URL, REACT_APP_ORDERS_ENDPOINT } = process.env;

export default class OrderService {
    constructor() {
        this.client = new AxiosClient();
    }

    getByUser = (idUser, callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_ORDERS_ENDPOINT}/${idUser}`, config: getHeaders(), callbackSuccess, callbackError };
        this.client.makeGetRequest(requestInfo);
    }

    createOrder = (idUser, callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_ORDERS_ENDPOINT}/${idUser}`, body: null, callbackSuccess, callbackError }
        this.client.makePostRequest(requestInfo);
    }
}