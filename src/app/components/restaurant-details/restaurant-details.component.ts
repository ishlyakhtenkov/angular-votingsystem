import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/common/restaurant';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurant: Restaurant = new Restaurant('', '', '', '');

  // This value defines show/not show 'Vote' button on restaurant details component
  voteButtonStatus: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private restaurantService: RestaurantService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.handleRestaurantDetails();
      }
    );

    this.updateVoteButtonStatus();
  }

  handleRestaurantDetails() {
    this.restaurant.id = this.route.snapshot.queryParamMap.get('id');
    this.restaurant.name = this.route.snapshot.queryParamMap.get('name');
    this.restaurant.address = this.route.snapshot.queryParamMap.get('address');
    this.restaurant.imageUrl = this.route.snapshot.queryParamMap.get('imageUrl');
  }

  // subscribe for voteButtonStatus from restaurant service
  updateVoteButtonStatus() {
    this.restaurantService.voteButtonStatus.subscribe(
      data => this.voteButtonStatus = data
    );
  }

  voteForRestaurant() {
    console.log("Vote for restaurant: id=" + this.restaurant.id);
  }

  deleteRestaurant() {
    this.restaurantService.deleteRestaurant(+this.restaurant.id).subscribe(
      response => {
        this.notificationService.sendNotification(NotificationType.SUCCESS, `The restaurant was deleted`);
        this.router.navigateByUrl("/restaurants");
      },
      (errorResponse: HttpErrorResponse) => {
        this.notificationService.sendNotification(NotificationType.ERROR, errorResponse.error.details);
      }
    );
  }
}