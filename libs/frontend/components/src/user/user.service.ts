import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAccount, IUser, UserRegistration } from '@dreams/shared/models';
import { environment } from '@dreams/shared/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.dataApiUrl + '/data';

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<IAccount> {
    // Implement logic to fetch current user's data from the server
    return this.http.get<IAccount>(`${this.apiUrl}/user/current`); //TODO: implement correct endpoint
  }

  updateUser(user: UserRegistration): Observable<UserRegistration> {
    // Implement logic to update user data on the server
    return this.http.put<UserRegistration>(`${this.apiUrl}/user/${user.account.id}`, user);
  }
}
