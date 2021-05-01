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

  // newDishes: Dish[] = [];
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
    this.menu.dishes.push(dish);
    this.isUpdated = true;
  }

  deleteDish(dishName: string) {
    console.log("delete dish with name: " + dishName);
    let index = this.menu.dishes.findIndex(tempDish => tempDish.name === dishName);
    console.log("delete dish with index: " + index);
    this.menu.dishes.splice(index, 1);
    this.isUpdated = true;
    for (let dish of this.menu.dishes) {
      console.log("dish name " + dish.name);
    }
  }

  publish() {
    console.log("Menu has been published");
    window.location.reload();
  }
}
