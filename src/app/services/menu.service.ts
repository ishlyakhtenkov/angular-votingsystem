import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../common/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl = 'http://localhost:8080/votingsystem/rest/restaurants';

  constructor(private httpClient: HttpClient) { }

  getMenuToday(theRestaurantId: number): Observable<Menu> {
    const menuTodayUrl = `${this.baseUrl}/${theRestaurantId}/menus/today`;
    return this.httpClient.get<Menu>(menuTodayUrl);
  }
}
