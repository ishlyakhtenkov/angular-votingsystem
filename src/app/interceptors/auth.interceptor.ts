import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private host = environment.apiUrl;

  constructor(private authenticationService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.host}/profile/login`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.host}/profile/register`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.host}/restaurants`) && httpRequest.method == 'GET') {
      return httpHandler.handle(httpRequest);
    }

    this.authenticationService.loadAuthData();
    const authData = this.authenticationService.getAuthData();
    const request = httpRequest.clone({setHeaders: {Authorization: `Basic ${authData}`}});
    
    return httpHandler.handle(request);
  }
}