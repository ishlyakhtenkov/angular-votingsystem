import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantService } from './services/restaurant.service';

import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { MenuTodayComponent } from './components/menu-today/menu-today.component';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'restaurant-form', component: RestaurantFormComponent},
  {path: 'restaurants/:id', component: RestaurantDetailsComponent},
  {path: 'search/:keyword', component: RestaurantListComponent},
  {path: 'restaurants', component: RestaurantListComponent},
  {path: '', redirectTo: '/restaurants', pathMatch: 'full'},
  {path: '**', redirectTo: '/restaurants', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    SearchComponent,
    RestaurantDetailsComponent,
    MenuTodayComponent,
    RestaurantFormComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
