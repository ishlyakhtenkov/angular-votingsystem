import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { UserTo } from 'src/app/common/user-to';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, 
              private notificationService: NotificationService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      data => {
        this.user = data;
      }
    );
  }

  onUpdateCurrentUser(theUserTo: UserTo) {
    let userTo = new UserTo(this.user.id, theUserTo.name, theUserTo.email, theUserTo.password);
    this.userService.updateUser(userTo).subscribe(
      response => {
        this.notificationService.sendNotification(NotificationType.SUCCESS, `The profile was updated`);
        const authData = window.btoa(theUserTo.email + ':' + theUserTo.password);
        this.authenticationService.saveAuthData(authData);
      },
      (errorResponse: HttpErrorResponse) => {
        this.notificationService.sendNotifications(NotificationType.ERROR, errorResponse.error.details);
      }
    )
  }

  deleteProfile() {
    this.userService.deleteUser().subscribe(
      response => {
        this.notificationService.sendNotification(NotificationType.SUCCESS, `The profile was deleted`);
        this.authenticationService.logOut();
        this.router.navigateByUrl("/restaurants");
      },
      (errorResponse: HttpErrorResponse) => {
        this.notificationService.sendNotifications(NotificationType.ERROR, errorResponse.error.details);
      }
    );
  }

  back(): void {
    this.location.back()
  }

}
