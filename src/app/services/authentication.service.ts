import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { UserTo } from '../common/user-to';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private profileUrl = 'http://localhost:8080/votingsystem/rest/profile';
  private authData: string;
  private loggedInUsername: string;

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    const authQueryParams = `?email=${email}&password=${password}`;
    return this.httpClient.post<User>(`${this.profileUrl}/login${authQueryParams}`, {});
  }

  register(userTo: UserTo): Observable<User> {
    return this.httpClient.post<User>(`${this.profileUrl}/register`, userTo);
  }

  logOut(): void {
    this.authData = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('authData');
    // localStorage.removeItem('users');
  }

  saveAuthData(authData: string): void {
    this.authData = authData;
    localStorage.setItem('authData', authData);
  }

  addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  loadAuthData(): void {
    this.authData = localStorage.getItem('authData');
  }

  getAuthData(): string {
    return this.authData;
  }

  isUserLoggedIn(): boolean {
    this.loadAuthData();
    if (this.authData != null && this.authData !== '') {
      this.loggedInUsername = window.atob(this.authData);
      return true;
    } else {
      this.logOut();
      return false;
    }
  }
}
