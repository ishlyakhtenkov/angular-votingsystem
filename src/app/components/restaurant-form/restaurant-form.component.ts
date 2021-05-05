import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/common/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

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
      console.log(`id: ${this.restaurant.id}, name: ${this.restaurantFormGroup.get('restaurant.name').value}, address: ${this.restaurantFormGroup.get('restaurant.address').value}`)
      if (this.restaurant.id == null) {
        console.log("Create new restaurant POST");
      } else {
        console.log("Update the restaurant PUT");
      }
    }
  }
}