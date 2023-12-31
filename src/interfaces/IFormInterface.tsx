export interface IRegisterUser {
    firstname : string;
    lastname : string;
    phone : string;
    email: string;
    gender:string;
    age:string;
    password:string;
    confirmpassword:string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface ILoginResponseData {
    tokens: Array<{ token: string }>;
}

export interface IUserdata {
    firstname: string;
    lastname: string;
}

export interface IforgotValue {
    email: string;
}

export interface Imessage {
    message: string;
}

export interface IResetValue {
    code:string;
    password:string;
    confirmpassword:string;
}
export interface IGetData {
    _id?:string;
    firstname ?: string;
    lastname ?: string;
    phone ?: string;
    email?: string;
    gender?:string;
    age?:string;
    tokens?: Array<{ token: string }>
}