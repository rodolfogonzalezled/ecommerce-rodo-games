import Cookies from "js-cookie";

const { REACT_APP_SESSION_COOKIE } = process.env;

export const isLogged = () => {
    let cookies = Cookies.get(REACT_APP_SESSION_COOKIE)
    if(!cookies){
        return false;
    }else{
        return cookies;
    }
}