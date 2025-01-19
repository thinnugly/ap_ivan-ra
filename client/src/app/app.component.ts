import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { TimeoutService } from './auth/services/timeout/timeout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAdminLoggedIn: boolean = false;
  isEmployeeLoggedIn: boolean = false;

  constructor(private router: Router, private timeoutService: TimeoutService) {}

  ngOnInit(): void {
    this.updateLoginStatus();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });
    this.timeoutService.startMonitoring();
  }

  ngOnDestroy() {
    this.timeoutService.stopMonitoring();
  }

  private updateLoginStatus(): void {
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
  }

  logout(): void {
    StorageService.logout();
    this.router.navigateByUrl('auth/login');
  }

  // Define os métodos chamados no template
  getToolbarColor(): string {
    if (this.isAdminLoggedIn) {
      return 'warn'; // Cor para o admin
    } else if (this.isEmployeeLoggedIn) {
      return 'accent'; // Cor para o funcionário
    } else {
      return 'primary'; // Cor padrão
    }
  }

  getAppName(): string {
    if (this.isAdminLoggedIn) {
      return 'Admin Dashboard';
    } else if (this.isEmployeeLoggedIn) {
      return 'Employee Dashboard';
    } else {
      return 'devWN - Task Management System';
    }
  }
}
