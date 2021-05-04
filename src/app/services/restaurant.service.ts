import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Menu } from '../common/menu';
import { Restaurant } from '../common/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  
  private baseUrl = 'http://localhost:8080/votingsystem/rest/restaurants';

  voteButtonStatus: Subject<boolean> = new Subject<boolean>();

  addRestaurantButtonStatus: Subject<boolean> = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  getRestaurant(theRestaurantId: number): Observable<Restaurant> {
    const restaurantUrl = `${this.baseUrl}/${theRestaurantId}`;
    return this.httpClient.get<Restaurant>(restaurantUrl);
  }

  getMenuToday(theRestaurantId: number): Observable<Menu> {
    const menuTodayUrl = `${this.baseUrl}/${theRestaurantId}/menus/today`;
    return this.httpClient.get<Menu>(menuTodayUrl);
  }

  getRestaurantList(): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(this.baseUrl);
  }

  searchRestaurants(theKeyword: string): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(`${this.baseUrl}/by?name=${theKeyword}`);
  }

  showVoteButton(enabled: boolean) {
    this.voteButtonStatus.next(enabled);
  }

  showAddRestaurantButton(enabled: boolean) {
    this.addRestaurantButtonStatus.next(enabled);
  }

  deleteRestaurant(theRestaurantId: number) {
    console.log(`Delete restaurant with id = ${theRestaurantId}`);
  }
}
