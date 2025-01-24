import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../services/notification/notification.service';
import { Notification } from '../../../../models/notification.models';
import { formatDistanceToNow } from 'date-fns';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  user: any = null;
  token: any = null;
  role: any = null;
  isLoading: boolean = true;
  isExpanded: boolean = false;

  notifications: Notification[] = [];
  notificationCount: number = 0;
  userId: any = StorageService.getUser();
  selectedNotification: Notification | null = null;
  isPanelOpen: boolean = false;
  notificationControl = new FormControl('');

  showAllNotifications: boolean = false;

  constructor(private router: Router, private notificationService: NotificationService) { }

  toggleSubMenu() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.user = StorageService.getUser();
    this.token = StorageService.getToken();
    this.role = StorageService.getUserRole();
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(res => {
      this.notifications = res;
      this.notificationCount = res.length;
    });
  }

  openNotificationPanel(notification: Notification, event: Event): void {
    event.preventDefault();

    if (!notification.read) {
      this.notificationService.markAsRead(notification.id).subscribe(() => {
        notification.read = true;
        this.notificationCount--;
        this.loadNotifications();
      });
    }
    this.selectedNotification = notification;
    this.isPanelOpen = true;
    this.notificationControl.setValue(this.selectedNotification.message);
  }

  closeNotificationPanel(): void {
    this.selectedNotification = null;
    this.isPanelOpen = false;
  }

  formatTime(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  logout(): void {
    StorageService.logout();
    this.router.navigateByUrl('auth/login');
  }

  viewAllNotifications(event: Event) {
    event.preventDefault();
    this.showAllNotifications = true;
    this.loadNotifications();
  }

  getNotifications() {
    if (this.showAllNotifications) {
      return this.notifications;  // Retorna todas as notificações
    }
    return this.notifications.slice(0, 2);  // Retorna apenas as duas primeiras notificações
  }
}
