import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../../models/notification.models';
import { StorageService } from '../../auth/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private refreshNeeded = new BehaviorSubject<boolean>(false);
  refreshNeeded$ = this.refreshNeeded.asObservable();

  triggerRefresh() {
    this.refreshNeeded.next(true);
  }


  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    );
  }


  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>('api/employee/notifications', {
      headers: this.createAuthorizationHeader(),
    });
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(
      `api/employee/notifications/${notificationId}`,
      {}, // Corpo vazio
      { headers: this.createAuthorizationHeader() }
    );
  }

  getUnreadNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>('api/admin/notifications', {
      headers: this.createAuthorizationHeader(),
    });
  }

  markAsReadAdmin(notificationId: number): Observable<void> {
    return this.http.put<void>(
      `api/admin/notifications/${notificationId}`,
      {}, // Corpo vazio
      { headers: this.createAuthorizationHeader() }
    );
  }
}
