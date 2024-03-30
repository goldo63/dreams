import { IAccount } from "./account.interface";

export interface UserCredentials {
    username: string;
    password: string;
}

export interface UserRegistration extends UserCredentials {
    account: IAccount
}

export interface Token {
    token: string
}
