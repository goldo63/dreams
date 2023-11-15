import { Injectable } from '@angular/core';
import { IAccount, ICompany, IUser } from '@dreams/shared/models';
import { AccountValidator } from '@dreams/shared/services';
import { BehaviorSubject, Observable, filter, from, of, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private users: IAccount[] = [
        {
            id: 0,
            phoneNumber: '123',
            dateOfRegistration: new Date(),
            password: 'password',
            accountDetails: {
                email: 'test@example.com',
                username: 'test',
                firstName: 'test',
                lastName: 'test',
            }
        },
        {
            id: 1,
            phoneNumber: '123',
            dateOfRegistration: new Date(),
            password: 'password',
            accountDetails: {
                organisationCode: '123',
                name: 'test',
                verified: false
            }
        },
        {
            id: 2,
            phoneNumber: '123',
            dateOfRegistration: new Date(),
            password: 'password',
            accountDetails: {
                email: 'test@example.com',
                username: 'test2',
                firstName: 'test',
                lastName: 'test',
            }
        },
        {
            id: 3,
            phoneNumber: '123',
            dateOfRegistration: new Date(),
            password: 'password',
            accountDetails: {
                organisationCode: '123',
                name: 'test',
                verified: false
            }
        },
    ];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    getAll(): Observable<IAccount[]> {
        return of(this.users.filter((user) => AccountValidator.isUser(user.accountDetails)));
    }

    getById(id: number): Observable<IAccount> {
        return from(this.users).pipe(
            filter((user) => AccountValidator.isUser(user.accountDetails)),
            filter((user) => user.id === id),
            take(1)
        )
    }
}