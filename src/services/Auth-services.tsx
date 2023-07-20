import axios, { AxiosError, AxiosResponse } from "axios"
import Cookies from 'js-cookie'
import {ILoginData, ILoginResponseData, IResetValue, IforgotValue } from "../interfaces/IFormInterface";
import Toaster from "../hooks/Toaster";

export const API_URL = "http://localhost:3000/"


// Register
export const register = async (data:any) => {
    return await axios.post(`${API_URL}create`,data)
}


//Login
export const login = async (data: ILoginData) => {
    return await axios
    .post(`${API_URL}login`,data)
    .then((res:AxiosResponse<ILoginResponseData>) => {
        if(res.data.tokens[0].token){
            const userToken: string = res.data.tokens[0].token;
            Cookies.set("jwt", userToken , { expires: 3 });
            const userDetails:string = JSON.stringify(res.data)
            Cookies.set('userDetail',userDetails , { expires: 3 });
        }
        return res.data;
    })
    .catch((err:AxiosError<string>) => {
        if(err.response && err.response.data){
            Toaster.error(err.response.data)
        }else{
            console.log("Please check your credentials");
            
        }
    })
};


// Forgot Password

export const forgotPassword = async (forgotValue:IforgotValue) => {
    return await axios
    .post(`${API_URL}email-send`,forgotValue)
}

// Reset password

export const resetPassword = async (resetValue:IResetValue) => {
    return await axios
    .post(`${API_URL}reset-password`,resetValue)
}

