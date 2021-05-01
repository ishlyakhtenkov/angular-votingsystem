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

  newDishes: Dish[] = [];

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
    this.newDishes.push(dish);
  }

  publish() {
    console.log("Menu has been published");
    window.location.reload();
  }
}
