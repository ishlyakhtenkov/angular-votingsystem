import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotifierService) { }

  notify(type: NotificationType, message: string) {
    this.notifier.notify(type, message);
  }

  sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notify(notificationType, message);
    } else {
      this.notify(notificationType, 'An error occured. Please try again');
    }
  }
}
