import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  showAddRestaurantButton: boolean = true;

  constructor(private router: Router, private restaurantService: RestaurantService) { 
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'].includes('/restaurant-form')) {
          this.showAddRestaurantButton = false;
        } else {
          this.showAddRestaurantButton = true;
        }
      }
    });
   }

  ngOnInit(): void {
  }

  doSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`);
  }
}
