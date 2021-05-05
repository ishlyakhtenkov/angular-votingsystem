import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/common/user';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  showLoading: boolean;

  returnUrl: string;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/restaurants');
    } else {
      // this.router.navigateByUrl('/login');
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  }

  onLogin(email: string, password: string): void {
    this.showLoading = true;
    console.log(email + ':' + password);
    this.subscriptions.push(
      this.authenticationService.login(email, password).subscribe(
        (response: User) => {
          const authData = window.btoa(email + ':' + password);
          this.authenticationService.saveAuthData(authData);
          this.authenticationService.addUserToLocalCache(response);
          this.router.navigateByUrl(this.returnUrl);
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.details);
          this.showLoading = false;
        }
      )
    );
  }

  private sendErrorNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occured. Please try again');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());   
  }
}
