import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserCredentials, IAccount, Iidentity, AuthIdentifier, UserRegistration } from '@dreams/shared/models';
import { environment } from '@dreams/shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserKey = 'currentUser';
  private readonly apiUrl = environment.apiURL + '/auth';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  public currentUser$ = new BehaviorSubject<Iidentity | undefined>(undefined);

  constructor(private http: HttpClient) {
    this.initCurrentUser();
  }

  private initCurrentUser(): void {
    const authIdentifier = this.getAuthIdentifier();
    if (authIdentifier) {
      console.log('User found in local storage');
      this.currentUser$.next(authIdentifier.user);
    } else {
      console.log('No user found in local storage');
    }
  }

  login(formData: UserCredentials): Observable<boolean> {
    return this.http
      .post<AuthIdentifier>(`${this.apiUrl}/login`, formData, this.httpOptions)
      .pipe(
        map((data: any) => data.results),
        catchError(this.handleError),
        map((authIdentifier: AuthIdentifier) => this.handleAuthentication(authIdentifier))
      );
  }

  update(formData: UserRegistration): Observable<boolean> {
    return this.http
     .put<UserRegistration>(`${this.apiUrl}/user/${formData.account.id}`, formData, this.httpOptions)
     .pipe(
        map((data: any) => data.results),
        catchError(this.handleError)
      );
  }

  register(userData: UserRegistration): Observable<UserRegistration | undefined> {

    return this.http
      .post<UserRegistration>(`${this.apiUrl}/register`, userData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.currentUser$.next(undefined);
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: Iidentity | undefined) => user ? user.id === itemUserId : false)
    );
  }

  private handleAuthentication(authIdentifier: AuthIdentifier): boolean {
    if (authIdentifier) {
      this.saveAuthIdentifier(authIdentifier);
      this.currentUser$.next(authIdentifier.user);
      return true;
    }
    return false;
  }

  private saveAuthIdentifier(authIdentifier: AuthIdentifier): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(authIdentifier));
  }

  public getAuthIdentifier(): AuthIdentifier | null {
    const authIdentifierStr = localStorage.getItem(this.currentUserKey);
    return authIdentifierStr ? JSON.parse(authIdentifierStr) : null;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw new Error(error.message || 'Something went wrong');
  }
}
