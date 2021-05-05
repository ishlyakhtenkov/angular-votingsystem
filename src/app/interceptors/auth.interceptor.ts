import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes('http://localhost:8080/votingsystem/rest/profile/login')) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes('http://localhost:8080/votingsystem/rest/profile/register')) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes('http://localhost:8080/votingsystem/rest/restaurants') && httpRequest.method == 'GET') {
      return httpHandler.handle(httpRequest);
    }

    this.authenticationService.loadAuthData();
    const authData = this.authenticationService.getAuthData();
    const request = httpRequest.clone({setHeaders: {Authorization: `Basic ${authData}`}});

    return httpHandler.handle(request);
  }
}
