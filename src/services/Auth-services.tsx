import axios, { AxiosResponse } from "axios"
import Cookies from 'js-cookie'
import { ILoginData, ILoginResponseData } from "../interfaces/IFormInterface";

const API_URL = "http://localhost:3000/"


// Register
export const register = async (data:any) => {
    console.log('Request URL:', `${API_URL}create`);
    console.log('Request Data:', data);
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
        }
        return res.data;
    })
    .catch((err) => {
        console.log(err);
    })
    // try {
    //     const loginResponse:AxiosResponse<ILoginResponseData> = await axios.post(`${API_URL}login`,data);
        
    //     console.log("=>",loginResponse.data)
    //     if () {
    //         const token = loginResponse.data?.tokens[0].token;
    //         Cookies.set("jwt", token, { expires: 3 });
    //     }
    // } catch (error) {
    //     console.log(error);
        
    // }
};