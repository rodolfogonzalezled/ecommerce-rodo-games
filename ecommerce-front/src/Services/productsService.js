import { getHeaders } from "../Utils/http.js";
import AxiosClient from "./axiosClient.js";

const { REACT_APP_BASE_URL, REACT_APP_PRODUCTS_ENDPOINT } = process.env;

export default class ProductService {
    constructor() {
        this.client = new AxiosClient();
    }

    getAll = (callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_PRODUCTS_ENDPOINT}`, config: getHeaders(), callbackSuccess, callbackError };
        this.client.makeGetRequest(requestInfo);
    }

    getById = (id, callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_PRODUCTS_ENDPOINT}/${id}`, config: getHeaders(), callbackSuccess, callbackError };
        this.client.makeGetRequest(requestInfo);
    }

    register = (body, callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_PRODUCTS_ENDPOINT}`, body, callbackSuccess, callbackError }
        this.client.makePostRequest(requestInfo);
    }

    update = (id, body, callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_PRODUCTS_ENDPOINT}/${id}`, body, callbackSuccess, callbackError }
        this.client.makePutRequest(requestInfo);
    }

    delete = (id, callbackSuccess, callbackError) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_PRODUCTS_ENDPOINT}/${id}`, callbackSuccess, callbackError }
        this.client.makeDeleteRequest(requestInfo);
    }
}