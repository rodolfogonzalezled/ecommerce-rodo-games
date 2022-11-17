import { getHeaders } from "../Utils/http.js";
import AxiosClient from "./axiosClient.js";

const { REACT_APP_BASE_URL, REACT_APP_SESSIONS_ENDPOINT } = process.env;

export default class SessionService {
    constructor() {
        this.client = new AxiosClient();
    }

    register = ({ body, callbackSuccess, callbackError }) => {
        const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_SESSIONS_ENDPOINT}/register`, body, callbackSuccess, callbackError }
        this.client.makePostRequest(requestInfo);
    }
}