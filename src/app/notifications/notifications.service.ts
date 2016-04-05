import { Injectable } from 'angular2/core';
import { Subject } from 'rxjs/Subject';

import { Notification } from './notifications.model';

@Injectable()
export class NotificationsService {
    private _notifications = new Subject<Notification>();

    public noteAdded = this._notifications.asObservable();

    public add(notification: Notification): void {
        this._notifications.next(notification);
    }
}
