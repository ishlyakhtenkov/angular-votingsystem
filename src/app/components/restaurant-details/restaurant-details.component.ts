import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/common/restaurant';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.handleRestaurantDetails();
      }
    );
  }

  handleRestaurantDetails() {
    // const theRestaurantId: number = +this.route.snapshot.paramMap.get('id');

    this.restaurant.id = this.route.snapshot.queryParamMap.get('id');
    this.restaurant.name = this.route.snapshot.queryParamMap.get('name');
    this.restaurant.address = this.route.snapshot.queryParamMap.get('address');
    this.restaurant.imageUrl = this.route.snapshot.queryParamMap.get('imageUrl');
  }
}