import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dish } from 'src/app/common/dish';
import { Menu } from 'src/app/common/menu';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CustomValidators } from 'src/app/validators/custom-validators';


export function duplicateNameValidator(dishes: Dish[], updatedDishName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let index = dishes.findIndex(tempDish => tempDish.name === control.value);
    if (control.value !== undefined && (index != -1) && control.value !== updatedDishName) {
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

  menu: Menu = new Menu();

  currentDishes: Dish[] = [];

  isUpdated: boolean = false;

  dishFormGroup: FormGroup;

  dishFormNew: boolean = true;

  updatedDishName: string;

  @Input()
  restaurantId: string;

  constructor(private restaurantService: RestaurantService, private router: Router, private formBuilder: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.getTodayMenu();

    this.makeDishForm('', 0, true);
  }

  get name() {
    return this.dishFormGroup.get('dish.name');
  }
  get price() {
    return this.dishFormGroup.get('dish.price');
  }

  getTodayMenu() {
    this.restaurantService.getMenuToday(+this.restaurantId).subscribe(
      data => {
        this.menu = data;
        this.sortDishesArray(this.menu.dishes);
        this.currentDishes = Array.from(this.menu.dishes);
        this.restaurantService.showVoteButton(this.menu.dishes.length > 0);
      }
    );
  }

  vote() {
    console.log("Vote for restaurant: id=" + this.restaurantId);
  }

  addDish() {
    let dish: Dish = new Dish();
    dish.name = "sapogi";
    dish.price = 200;
    // this.menu.dishes.push(dish);
    this.currentDishes.push(dish);
    // this.isUpdated = true;
    // this.restaurantService.showVoteButton(this.menu.dishes.length > 0);
    // this.restaurantService.showVoteButton(this.currentDishes.length > 0); //may be we should show button on real dishes (menu.dishes)
  }

  deleteDish(dishName: string) {
    console.log("delete dish with name: " + dishName);
    // let index = this.menu.dishes.findIndex(tempDish => tempDish.name === dishName);
    let index = this.currentDishes.findIndex(tempDish => tempDish.name === dishName);
    // this.menu.dishes.splice(index, 1);
    // this.isUpdated = true;
    if (index != -1) {
      console.log("delete dish with index: " + index);
      this.currentDishes.splice(index, 1);
    }
    // this.restaurantService.showVoteButton(this.menu.dishes.length > 0);
    // this.restaurantService.showVoteButton(this.currentDishes.length > 0); //may be we should show button on real dishes (menu.dishes)
    // for (let dish of this.menu.dishes) {
    //   console.log("dish name " + dish.name);
    // }
  }

  updateDish(dishName: string, dishPrice: number) {
    this.updatedDishName = dishName;
    this.makeDishForm(dishName, dishPrice, false);
  }

  publish() {
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

  isEqual(): boolean {
    return JSON.stringify(this.currentDishes) === JSON.stringify(this.menu.dishes);
  }

  onSubmit() {
    if (this.dishFormGroup.invalid) {
      this.dishFormGroup.markAllAsTouched();
    } else {
      console.log(`name: ${this.dishFormGroup.get('dish.name').value}, price: ${this.dishFormGroup.get('dish.price').value}`);
      console.log(this.dishFormNew);
      let dish: Dish = new Dish();
      dish.name = this.dishFormGroup.get('dish.name').value;
      dish.price = this.dishFormGroup.get('dish.price').value;
      if (this.dishFormNew) {
        this.currentDishes.push(dish);
        this.sortDishesArray(this.currentDishes);
      } else {
        console.log("else : " + this.updatedDishName);
        this.deleteDish(this.updatedDishName);
        this.currentDishes.push(dish);
        this.sortDishesArray(this.currentDishes);
      }
      document.getElementById("dish-modal-close").click();
    }
  }

  makeDishForm(dishName: string, dishPrice: number, theDishFormNew: boolean) {
    this.dishFormNew = theDishFormNew;
    this.dishFormGroup = this.formBuilder.group({
      dish: this.formBuilder.group({
        name: new FormControl(dishName, [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhitespace, duplicateNameValidator(this.currentDishes, this.updatedDishName)]),
        price: new FormControl(dishPrice, [Validators.required, CustomValidators.minOne])
      })
    });
  }

  cleanModal() {
    this.dishFormNew = true;
    this.dishFormGroup.reset();
  }

  sortDishesArray(dishes: Dish[]) {
    console.log("sort array");
    dishes.sort( (dish1, dish2) => dish1.name.localeCompare(dish2.name) );
  }
}
