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
    firstname(arg0: string, firstname: any): unknown;
    tokens: Array<{ token: string }>;
  }