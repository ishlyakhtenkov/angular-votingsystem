import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dish } from 'src/app/common/dish';
import { Menu } from 'src/app/common/menu';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

// Custom Duplicate Dish Name Validator
export function duplicateDishNameValidator(dishes: Dish[], updatedDishOldName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let index = dishes.findIndex(tempDish => tempDish.name === control.value);
    if (control.value !== undefined && (index != -1) && control.value !== updatedDishOldName) {
      return { 'duplicateName': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-menu-today',
  templateUrl: './menu-today.component.html',
  styleUrls: ['./menu-today.component.css']
})
export class MenuTodayComponent implements OnInit {

  // Menu from BackEnd
  menu: Menu = new Menu();

  currentDishes: Dish[] = [];

  dishFormGroup: FormGroup;

  // This value defines wich dish (new or existed) comes from modal form (it needs to know add or update dish in currentDishes array)
  isDishNew: boolean = true;

  // This value stores old name of updated dish that comes from modal form (it needs for duplicate dish name validator, and for update dish in currentDishes array)
  updatedDishOldName: string;

  @Input()
  restaurantId: string;

  constructor(private restaurantService: RestaurantService, private router: Router, private formBuilder: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.getTodayMenu();

    this.makeDishFormGroup('', 0, true);
  }

  getTodayMenu() {
    this.restaurantService.getMenuToday(+this.restaurantId).subscribe(
      data => {
        this.menu = data;
        this.sortDishesArray(this.menu.dishes);
        this.currentDishes = Array.from(this.menu.dishes);

        // Tell restaurant service show/not show 'Vote button'
        this.restaurantService.showVoteButton(this.menu.dishes.length > 0);
      }
    );
  }

  // Getters for Dish FormGroup values
  get name() {
    return this.dishFormGroup.get('dish.name');
  }
  get price() {
    return this.dishFormGroup.get('dish.price');
  }

  deleteDish(dishName: string) {
    console.log("Delete dish with name: " + dishName);
    let index = this.currentDishes.findIndex(tempDish => tempDish.name === dishName);
    if (index != -1) {
      this.currentDishes.splice(index, 1);
    }
  }

  publishMenuTo() {
    // TODO pass currentDishes to backend
    if (this.menu.dishes.length == 0) {
      console.log("MenuTo POST for restaurant: " + this.restaurantId);
    } else if (this.currentDishes.length == 0) {
      console.log("MenuTo DELETE for restaurant: " + this.restaurantId);
    } else {
      console.log("MenuTo PUT for restaurant: " + this.restaurantId);
    }
    window.location.reload();
  }

  makeDishFormGroupForUpdate(dishName: string, dishPrice: number) {
    this.updatedDishOldName = dishName;
    this.makeDishFormGroup(dishName, dishPrice, false);
  }

  // Prepare Dish Form Group
  makeDishFormGroup(dishName: string, dishPrice: number, isDishNew: boolean) {
    this.isDishNew = isDishNew;
    this.dishFormGroup = this.formBuilder.group({
      dish: this.formBuilder.group({
        name: new FormControl(dishName, [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhitespace, duplicateDishNameValidator(this.currentDishes, this.updatedDishOldName)]),
        price: new FormControl(dishPrice, [Validators.required, CustomValidators.minOne])
      })
    });
  }

  onSubmit() {
    if (this.dishFormGroup.invalid) {
      this.dishFormGroup.markAllAsTouched();
    } else {
      let dish: Dish = new Dish();
      dish.name = this.dishFormGroup.get('dish.name').value;
      dish.price = this.dishFormGroup.get('dish.price').value;
      if (this.isDishNew) {
        this.currentDishes.push(dish);
        this.sortDishesArray(this.currentDishes);
      } else {
        this.deleteDish(this.updatedDishOldName);
        this.updatedDishOldName = null;
        this.currentDishes.push(dish);
        this.sortDishesArray(this.currentDishes);
      }

      // Close Modal Dish Form after pushing 'Save' button
      document.getElementById("dish-modal-close").click();
    }
  }

  sortDishesArray(dishes: Dish[]) {
    dishes.sort((dish1, dish2) => dish1.name.localeCompare(dish2.name));
  }

  // Check menu.dishes and currentDishes for equality
  isDishArraysEqual(): boolean {
    return JSON.stringify(this.currentDishes) === JSON.stringify(this.menu.dishes);
  }
}
