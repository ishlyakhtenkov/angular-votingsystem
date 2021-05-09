import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { UserTo } from '../common/user-to';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private profileUrl = 'http://localhost:8081/votingsystem/rest/profile';

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(this.profileUrl); 
  }

  updateUser(userTo: UserTo): Observable<any> {
    return this.httpClient.put<any>(this.profileUrl, userTo);
  }

  deleteUser(): Observable<any> {
    return this.httpClient.delete<any>(this.profileUrl);
  }
}
