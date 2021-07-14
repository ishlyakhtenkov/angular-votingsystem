import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../common/menu';
import { MenuTo } from '../common/menu-to';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl = `${environment.apiUrl}/restaurants`;

  constructor(private httpClient: HttpClient) { }

  getMenuToday(theRestaurantId: number): Observable<Menu> {
    const menuTodayUrl = `${this.baseUrl}/${theRestaurantId}/menus/today`;
    return this.httpClient.get<Menu>(menuTodayUrl);
  }

  createMenuToday(theRestaurantId: number, menuTo: MenuTo): Observable<Menu> {
    const menuTodayUrl = `${this.baseUrl}/${theRestaurantId}/menus/today`;
    return this.httpClient.post<Menu>(menuTodayUrl, menuTo);
  }

  updateMenuToday(theRestaurantId: number, menuTo: MenuTo): Observable<any> {
    const menuTodayUrl = `${this.baseUrl}/${theRestaurantId}/menus/today`;
    return this.httpClient.put<any>(menuTodayUrl, menuTo);
  }

  deleteMenuToday(theRestaurantId: number): Observable<any> {
    const menuTodayUrl = `${this.baseUrl}/${theRestaurantId}/menus/today`;
    return this.httpClient.delete<any>(menuTodayUrl);
  }
}