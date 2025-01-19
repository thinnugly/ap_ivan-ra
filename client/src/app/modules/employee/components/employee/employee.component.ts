import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { WebSocketService } from '../../../../services/web-socket.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  user: any = null;
  token: any = null;
  role: any = null;
  isLoading: boolean = true;
  isExpanded: boolean = false;

  notifications: string[] = [];
  notificationCount: number = 0;

  constructor(private router: Router, private webSocketService: WebSocketService) { }

  toggleSubMenu() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.user = StorageService.getUser();
    this.token = StorageService.getToken();
    this.role = StorageService.getUserRole();

    this.webSocketService.getNotifications().subscribe(notification => {
      this.notifications.push(notification);
      this.notificationCount++;
    });

  }

  logout(): void {
    StorageService.logout();
    this.router.navigateByUrl('auth/login');
  }
}
