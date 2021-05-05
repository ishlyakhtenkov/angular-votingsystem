import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { UserTo } from '../common/user-to';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private profileUrl = 'http://localhost:8080/votingsystem/rest/profile';

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<User | HttpErrorResponse> {
    return this.httpClient.get<User>(this.profileUrl); 
  }

  // may be i need to add observable here like in video
  updateUser(userTo: UserTo) {
    this.httpClient.put(this.profileUrl, userTo);
  }

  // may be i need to add observable here like in video
  deleteUser() {
    this.httpClient.delete(this.profileUrl);
  }
}
