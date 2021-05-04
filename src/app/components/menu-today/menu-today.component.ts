import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from 'src/app/common/dish';
import { Menu } from 'src/app/common/menu';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-menu-today',
  templateUrl: './menu-today.component.html',
  styleUrls: ['./menu-today.component.css']
})
export class MenuTodayComponent implements OnInit {

  menu: Menu = new Menu();

  currentDishes: Dish[] = [];

  isUpdated: boolean = false;

  @Input()
  restaurantId: string;

  constructor(private restaurantService: RestaurantService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.getTodayMenu();
  }

  getTodayMenu() {
    this.restaurantService.getMenuToday(+this.restaurantId).subscribe(
      data => {
        this.menu = data;
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
    console.log("delete dish with index: " + index);
    // this.menu.dishes.splice(index, 1);
    // this.isUpdated = true;
    this.currentDishes.splice(index, 1);
    // this.restaurantService.showVoteButton(this.menu.dishes.length > 0);
    // this.restaurantService.showVoteButton(this.currentDishes.length > 0); //may be we should show button on real dishes (menu.dishes)
    // for (let dish of this.menu.dishes) {
    //   console.log("dish name " + dish.name);
    // }
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
}
