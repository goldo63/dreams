import { Injectable } from '@angular/core';
import { IAccount, ICompany, IUser } from '@dreams/shared/models';
import { AccountValidator } from '@dreams/shared/services';
import { BehaviorSubject, Observable, delay, filter, from, map, of, take } from 'rxjs';

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

    create(user: IAccount): Observable<IAccount[]> {
        // Simulate an asynchronous operation, for example, saving to a backend.
        return of(user).pipe(
          map((newUser: IAccount) => {
            this.users.push(newUser);
            return this.users;
          })
        );
    }

    update(user: IAccount): Observable<IAccount[]> {
        return of(user).pipe(
          map((updatedUser: IAccount) => {
            const index = this.users.findIndex(u => u.id === updatedUser.id);
            if (index !== -1) {
              this.users[index] = updatedUser;
            }
      
            // Return the updated array
            return this.users;
          })
        );
      }
}