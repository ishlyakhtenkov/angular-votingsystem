import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/common/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();

  voteButtonStatus: boolean = false;

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.handleRestaurantDetails();
      }
    );
    this.updateVoteButtonStatus();
  }

  handleRestaurantDetails() {
    // const theRestaurantId: number = +this.route.snapshot.paramMap.get('id');

    this.restaurant.id = this.route.snapshot.queryParamMap.get('id');
    this.restaurant.name = this.route.snapshot.queryParamMap.get('name');
    this.restaurant.address = this.route.snapshot.queryParamMap.get('address');
    this.restaurant.imageUrl = this.route.snapshot.queryParamMap.get('imageUrl');
  }

  updateVoteButtonStatus() {
    this.restaurantService.voteButtonStatus.subscribe(
      data => this.voteButtonStatus = data
    );
  }

  vote() {
    console.log("Vote for restaurant: id=" + this.restaurant.id);
  }
}