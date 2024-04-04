import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    // Get the auth token from the service.
    const authToken = this.auth.getAuthIdentifier()?.token
    console.log(`AuthInterceptor check`);
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    let authReq = req;
    if (authToken !== undefined) {
        authReq = req.clone({
            setHeaders: { authorization: `${authToken.token}` }
        });
    }

    // send cloned request with header to the next handler.
    return next.handle(authReq)
  }
}

/**
 * Http interceptor providers in outside-in order
 * https://angular.io/guide/http#interceptor-order
 */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]
