import { Injectable } from '@angular/core';
import { IAccount, IPost } from '@dreams/shared/models';
import { AccountValidator } from '@dreams/shared/services';
import { BehaviorSubject, Observable, catchError, delay, filter, from, map, of, take } from 'rxjs';

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
            email: 'tim@example.com',
            username: 'tim',
            firstName: 'Tim',
            lastName: 'Smith',
          },
        },
        {
          id: 1,
          phoneNumber: '123',
          dateOfRegistration: new Date(),
          password: 'password',
          accountDetails: {
            email: 'jane@example.com',
            username: 'jane',
            firstName: 'Jane',
            lastName: 'Doe',
          },
        },
        {
          id: 2,
          phoneNumber: '123',
          dateOfRegistration: new Date(),
          password: 'password',
          accountDetails: {
            email: 'john@example.com',
            username: 'john',
            firstName: 'John',
            lastName: 'Doe',
          },
        },
        {
          id: 3,
          phoneNumber: '123',
          dateOfRegistration: new Date(),
          password: 'password',
          accountDetails: {
            email: 'emma@example.com',
            username: 'emma',
            firstName: 'Emma',
            lastName: 'Johnson',
          },
        },
        {
          id: 4,
          phoneNumber: '123',
          dateOfRegistration: new Date(),
          password: 'password',
          accountDetails: {
            email: 'alex@example.com',
            username: 'alex',
            firstName: 'Alex',
            lastName: 'Wilson',
          },
        },
        {
          id: 5,
          phoneNumber: '123',
          dateOfRegistration: new Date(),
          password: 'password',
          accountDetails: {
            organisationCode: 'org1',
            name: 'Company A',
            verified: false,
          },
        },
        {
          id: 6,
          phoneNumber: '123',
          dateOfRegistration: new Date(),
          password: 'password',
          accountDetails: {
            organisationCode: 'org2',
            name: 'Company B',
            verified: true,
          },
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
        console.log('creating user');
        return of(user).pipe(
          map((newUser: IAccount) => {
            this.users.push(newUser);
            return this.users;
          })
        );
    }

    update(user: IAccount): Observable<IAccount[]> {
        console.log('updating user');
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

    delete(id: number): Observable<IAccount[]> {
        return of(id).pipe(
          map((deleteId: number) => {
            const index = this.users.findIndex(user => user.id === deleteId);
      
            if (index !== -1) {
              this.users.splice(index, 1);
            }
            else {
                console.log(`User with id ${deleteId} not found.`);
            }
      
            return this.users.filter((user) => AccountValidator.isUser(user.accountDetails));
          }),
        );
      }
}