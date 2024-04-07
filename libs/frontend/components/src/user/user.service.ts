import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ApiResponse, IAccount, IReaction, IUser, UserRegistration } from '@dreams/shared/models';
import { AccountValidator, environment } from '@dreams/shared/services';
import { AuthService } from '@dreams/frontend/uiAuth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiURL + '/data';

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  getCurrentUser(): Observable<IAccount> {
    const id = this.authService.getAuthIdentifier()?.user.id;
    const url = `${this.apiUrl}/user/${id}`;
    console.log(`GET user by ID: ${url}`);
    return this.http.get<ApiResponse<IAccount>>(url).pipe(
      map(response => response.results as IAccount),
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<IAccount> {
    const url = `${this.apiUrl}/user/${id}`;
    console.log(`GET user by ID: ${url}`);
    return this.http.get<ApiResponse<IAccount>>(url).pipe(
      map(response => response.results as IAccount),
      catchError(this.handleError)
    );
  }

  updateUser(user: UserRegistration): Observable<UserRegistration> {
    // Implement logic to update user data on the server
    return this.http.put<UserRegistration>(`${this.apiUrl}/user/${user.account.id}`, user);
  }

  getReactions(): Observable<IReaction[]> {
    const url = `${this.apiUrl}/post/${this.authService.getAuthIdentifier()?.user.id}/myReactions`;
    console.log(`GET reactions: ${url}`);
    return this.http.get<ApiResponse<IReaction[]>>(url).pipe(
      map(response => response.results as IReaction[]),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    //console.error('Error occurred:', error);

    return throwError(() => new Error(error.message));
  }
}
