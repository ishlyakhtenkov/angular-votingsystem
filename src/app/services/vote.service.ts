import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vote } from '../common/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private baseUrl = `${environment.apiUrl}/votes`;

  constructor(private httpClient: HttpClient) { }

  registerVote(theRestaurantId: number): Observable<Vote> {
    const restaurantIdParam = `?restaurantId=${theRestaurantId}`;
    return this.httpClient.post<Vote>(`${this.baseUrl}${restaurantIdParam}`, {});
  }
}
