import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = null;
  token: any = null;
  role: any = null;
  isLoading: boolean = true;
  isExpanded: boolean = false;
  countActivitiesConfigurations: number | null = null;
  countDeployActivity: number | null = null;

  constructor(private router: Router, private employeeService: EmployeeService, private snackBar: MatSnackBar) {}

  toggleSubMenu() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.user = StorageService.getUser();
    this.token = StorageService.getToken();
    this.role = StorageService.getUserRole();
    this.fectCountActivitiesConfigurations();
    this.fectCountDeployActivity();
  }

  logout(): void {
    StorageService.logout();
    this.router.navigateByUrl('auth/login');
  }

  fectCountActivitiesConfigurations() {
    this.employeeService.getCountActivitiesConfigurations().subscribe({
      next: (count) => {
        this.countActivitiesConfigurations = count;
      },
      error: (error) => {
        this.snackBar.open("Erro ao carregar a contagem de atividades.", "Error", {duration: 5000})
      }
    });
  }

  fectCountDeployActivity() {
    this.employeeService.getCountDeployActivity().subscribe({
      next: (count) => {
        this.countDeployActivity = count;
      },
      error: (error) => {
        this.snackBar.open("Erro ao carregar a contagem de atividades.", "Error", {duration: 5000})
      }
    });
  }

}
