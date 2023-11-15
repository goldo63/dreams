import { Id } from "./id.interface";

export interface IAccount {
    id: Id;
    phoneNumber: string;
    dateOfRegistration: Date;
    password: string;
    accountDetails: IUser | ICompany;
}

export interface IUser {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
}

export interface ICompany {
    organisationCode: string;
    name: string;
    verified: boolean;
}