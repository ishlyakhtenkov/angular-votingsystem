import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/common/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { RestaurantValidators } from 'src/app/validators/restaurant-validators';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();

  restaurantFormGroup: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.showAddRestaurantButton(false);

    this.route.paramMap.subscribe(
      () => {
        this.handleRestaurantDetails();
      }
    );

    this.restaurantFormGroup = this.formBuilder.group({
      restaurant: this.formBuilder.group({
        name: new FormControl(this.restaurant.name, [Validators.required, Validators.minLength(2), RestaurantValidators.notOnlyWhitespace]),
        address: new FormControl(this.restaurant.address, [Validators.required, Validators.minLength(10), RestaurantValidators.notOnlyWhitespace])
      })
    });
  }

  get name() {
    return this.restaurantFormGroup.get('restaurant.name');
  }
  get address() {
    return this.restaurantFormGroup.get('restaurant.address');
  }

  handleRestaurantDetails() {
    // const theRestaurantId: number = +this.route.snapshot.paramMap.get('id');

    this.restaurant.id = this.route.snapshot.queryParamMap.get('id');
    this.restaurant.name = this.route.snapshot.queryParamMap.get('name');
    this.restaurant.address = this.route.snapshot.queryParamMap.get('address');
  }

  onSubmit() {
    if (this.restaurantFormGroup.invalid) {
      this.restaurantFormGroup.markAllAsTouched();
    }
    console.log(this.restaurant.id);
    console.log(`name: ${this.restaurantFormGroup.get('restaurant.name').value}, address: ${this.restaurantFormGroup.get('restaurant.address').value}`)
    if (this.restaurant.id == null) {
      console.log("Create new restaurant POST");
    } else {
      console.log("Update the restaurant PUT");
    }
  }
}
