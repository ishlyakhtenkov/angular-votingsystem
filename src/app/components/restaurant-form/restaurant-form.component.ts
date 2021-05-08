import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/common/restaurant';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {

  restaurant: Restaurant = new Restaurant('', '', '', '');

  restaurantFormGroup: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private restaurantService: RestaurantService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.handleRestaurantDetails();
      }
    );

    this.restaurantFormGroup = this.formBuilder.group({
      restaurant: this.formBuilder.group({
        name: new FormControl(this.restaurant.name, [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
        address: new FormControl(this.restaurant.address, [Validators.required, Validators.minLength(10), CustomValidators.notOnlyWhitespace])
      })
    });
  }

  handleRestaurantDetails() {
    this.restaurant.id = this.route.snapshot.queryParamMap.get('id');
    this.restaurant.name = this.route.snapshot.queryParamMap.get('name');
    this.restaurant.address = this.route.snapshot.queryParamMap.get('address');
    if (this.route.snapshot.queryParamMap.has('imageUrl')) {
      this.restaurant.imageUrl = this.route.snapshot.queryParamMap.get('imageUrl');
    } else {
      this.restaurant.imageUrl = 'assets/images/default-restaurant-image.jpg';
    }
  }

  // getters for FormGroup values
  get name() {
    return this.restaurantFormGroup.get('restaurant.name');
  }
  get address() {
    return this.restaurantFormGroup.get('restaurant.address');
  }

  onSubmit() {
    if (this.restaurantFormGroup.invalid) {
      this.restaurantFormGroup.markAllAsTouched();
    } else {
      let theRestaurant = new Restaurant(this.restaurant.id, this.restaurantFormGroup.get('restaurant.name').value, this.restaurantFormGroup.get('restaurant.address').value, this.restaurant.imageUrl);
      console.log(`id: ${this.restaurant.id}, name: ${this.restaurantFormGroup.get('restaurant.name').value}, address: ${this.restaurantFormGroup.get('restaurant.address').value}`)
      if (this.restaurant.id == null) {
        console.log("Create new restaurant POST");
        this.restaurantService.createRestaurant(theRestaurant).subscribe(
          (response: Restaurant) => {
            this.sendNotification(NotificationType.SUCCESS, `A new restaurant ${response.name} was created`);
            this.router.navigate([`/restaurants/${response.id}`], {queryParams: {id: response.id, name: response.name, address: response.address, imageUrl: response.imageUrl}});
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, errorResponse.error.details);
          }
        );
      } else {
        console.log("Update the restaurant PUT");
        this.restaurantService.updateRestaurant(theRestaurant).subscribe(
          response => {
            this.sendNotification(NotificationType.SUCCESS, `The restaurant was updated`);
            this.router.navigate([`/restaurants/${theRestaurant.id}`], {queryParams: {id: theRestaurant.id, name: theRestaurant.name, address: theRestaurant.address, imageUrl: theRestaurant.imageUrl}});
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, errorResponse.error.details);
          }
        );
      }
    }
  }

  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occured. Please try again');
    }
  }
}