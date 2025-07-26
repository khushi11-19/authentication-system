import cookie from "js-cookie";
import axios from "axios";
import{baseURL} from "./constant";


export const setCookie =(Key,value)=>{
    cookie.set(Key,value,{expires:1});
};
export const removeCookie =(Key)=>{
    cookie.remove(Key);
};
export const getCookie =(Key)=>{
   return cookie.get(Key);
};

export const setAuthentication = (token )=>{
    setCookie("token",token);
};

export const logOut=()=>{
    removeCookie("token");
};

export const isLogin =async()=>{
    const token=getCookie("token");
    if(token){
        const res= await axios.post(`${baseURL}/auth`,{token});
        return res.data;
    }
    return false;
};