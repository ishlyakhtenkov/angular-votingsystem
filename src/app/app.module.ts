import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RestaurantService } from './services/restaurant.service';

import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { MenuTodayComponent } from './components/menu-today/menu-today.component';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './services/notification.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
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
    RestaurantFormComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NotificationModule,
    NgbModule,
    FormsModule
  ],
  providers: [RestaurantService, AuthenticationService, UserService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, AuthenticationGuard, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
