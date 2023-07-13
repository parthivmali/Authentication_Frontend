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