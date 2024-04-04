import { Injectable } from '@angular/core';
import { IPost, ReadAbility, ApiResponse } from '@dreams/shared/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, delay, filter, from, map, of, take, tap, throwError } from 'rxjs';
import { environment } from '@dreams/shared/services';
import { AuthService } from '@dreams/frontend/uiAuth';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
    providedIn: 'root',
})
export class PostService {

  endpoint = environment.apiURL + '/data/post';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
    ) {}

  public getAllpublic(options?: any): Observable<IPost[]> {
    console.log(`list ${this.endpoint}`);

    return this.http
        .get<ApiResponse<IPost[]>>(this.endpoint, {
            ...options,
            ...httpOptions,
        })
        .pipe(
            tap(console.log),
            map((response: any) => response.results as IPost[]),
            catchError(this.handleError)
        );
  }
  

  getById(id: string | null, options?: any): Observable<IPost> {
    if (id === null) return this.handleError('ID is null');

    const url = `${this.endpoint}/${id}`;
    
    console.log(`read ${url}`);
    
    return this.http
        .get<ApiResponse<IPost>>(url, {
            ...options,
            ...httpOptions,
        })
        .pipe(
            map((response: any) => response.results as IPost),
            catchError(this.handleError)
        );
  }

  create(post: IPost): Observable<IPost> {
    console.log('creating post');

    return this.http
      .post<IPost>(this.endpoint, post)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(post: IPost): Observable<IPost> {
    console.log('updating post');
    const url = `${this.endpoint}/${post.id}`;
    return this.http
      .put<IPost>(url, post)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    console.log('deleting post');
    const url = `${this.endpoint}/${id}`;
    return this.http
      .delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    //console.error('Error occurred:', error);

    return throwError(() => new Error(error.message));
  }
}
