import { Component } from '@angular/core';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  user: any = null;
  token: any = null;
  role: any = null;
  isLoading: boolean = true;
  isExpanded: boolean = false;

  constructor(private router: Router) {}

  toggleSubMenu() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.user = StorageService.getUser();
    this.token = StorageService.getToken();
    this.role = StorageService.getUserRole();

  }

  logout(): void {
    StorageService.logout();
    this.router.navigateByUrl('auth/login');
  }
}
