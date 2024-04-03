import { Injectable } from '@angular/core';
import { IAccount, ICompany, IUser } from '@dreams/shared/models';
import { AccountValidator } from '@dreams/shared/services';
import { BehaviorSubject, Observable, catchError, delay, filter, from, map, of, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // private users: IAccount[] = [
    //     {
    //       id: '0',
    //       username: 'tim',
    //       phoneNumber: '123',
    //       dateOfRegistration: new Date(),
    //       password: 'password',
    //       accountDetails: {
    //         email: 'tim@example.com',
    //         firstName: 'Tim',
    //         lastName: 'Smith',
    //       },
    //     },
    //     {
    //       id: 1,
    //       username: 'jane',
    //       phoneNumber: '123',
    //       dateOfRegistration: new Date(),
    //       password: 'password',
    //       accountDetails: {
    //         email: 'jane@example.com',
    //         firstName: 'Jane',
    //         lastName: 'Doe',
    //       },
    //     },
    //     {
    //       id: 2,
    //       username: 'jane',
    //       phoneNumber: '123',
    //       dateOfRegistration: new Date(),
    //       password: 'password',
    //       accountDetails: {
    //         email: 'john@example.com',
    //         firstName: 'John',
    //         lastName: 'Doe',
    //       },
    //     },
    //     {
    //       id: 3,
    //       username: 'emma',
    //       phoneNumber: '123',
    //       dateOfRegistration: new Date(),
    //       password: 'password',
    //       accountDetails: {
    //         email: 'emma@example.com', 
    //         firstName: 'Emma',
    //         lastName: 'Johnson',
    //       },
    //     },
    //     {
    //       id: 4,
    //       username: 'alex',
    //       phoneNumber: '123',
    //       dateOfRegistration: new Date(),
    //       password: 'password',
    //       accountDetails: {
    //         email: 'alex@example.com',
    //         firstName: 'Alex',
    //         lastName: 'Wilson',
    //       },
    //     },
    //     {
    //       id: 5,
    //       username: 'Company A',
    //       phoneNumber: '123',
    //       dateOfRegistration: new Date(),
    //       password: 'password',
    //       accountDetails: {
    //         organisationCode: 'org1',
    //         verified: false,
    //       },
    //     },
    //     {
    //       id: 6,
    //       username: 'Company B',
    //       phoneNumber: '123',
    //       dateOfRegistration: new Date(),
    //       password: 'password',
    //       accountDetails: {
    //         organisationCode: 'org2',
    //         verified: true,
    //       },
    //     },
    //   ];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    getAll(): Observable<IAccount[]> {
        return of(this.users.filter((user) => AccountValidator.isUser(user.accountDetails)));
    }

    getById(id: string): Observable<IAccount> {
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

    delete(id: string): Observable<IAccount[]> {
        return of(id).pipe(
          map((deleteId: string) => {
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