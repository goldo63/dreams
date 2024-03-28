import { Id } from "./id.interface";

export interface Iidentity {
    id: Id
    username: string
}

export interface IAccount extends Iidentity {
    phoneNumber: string;
    dateOfRegistration: Date;
    password: string;
    accountDetails: IUser | ICompany;
}

export interface IUser {
    email: string;
    firstName: string;
    lastName: string;

    friends: IUser[];
}

export interface ICompany {
    organisationCode: string;
    verified: boolean;
}