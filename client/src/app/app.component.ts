import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { TimeoutService } from './auth/services/timeout/timeout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit, OnDestroy  {

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
    //window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  ngOnDestroy() {
    this.timeoutService.stopMonitoring();
    //window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  private updateLoginStatus(): void {
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
  }

  logout(): void {
    StorageService.logout();
    this.router.navigateByUrl('auth/login');
  }


  handleBeforeUnload(event: BeforeUnloadEvent): void {
    StorageService.logout();
  }
}
