import { ICompany, IUser } from "@dreams/shared/models";

export abstract class AccountValidator {    
    public static isUser(account: IUser | ICompany): account is IUser {
        return 'username' in account;
    }
}