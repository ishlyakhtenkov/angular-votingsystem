import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router, private notificationService: NotificationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isUserAdmin(state);
  }

  private isUserAdmin(state: RouterStateSnapshot): boolean {
    if (this.authenticationService.isUserLoggedIn()) {
      if (this.authenticationService.isAdmin()) {
        return true;
      } else {
        this.router.navigateByUrl("/restaurants");
        this.notificationService.notify(NotificationType.ERROR, 'You do not have enough permissions!');
      }
    } else {
      this.router.navigate(['/login'], {queryParams: {'returnUrl': state.url}});

      //Send notification to user
      this.notificationService.notify(NotificationType.ERROR, 'You need to login to access this page');

      return false;
    }
  }
}
