import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  addRestaurantButtonStatus: boolean = true;

  constructor(private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.updateAddRestaurantButtonStatus();
  }

  updateAddRestaurantButtonStatus() {
    this.restaurantService.addRestaurantButtonStatus.subscribe(
      data => this.addRestaurantButtonStatus = data
    );
  }

  doSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`);
  }
}
