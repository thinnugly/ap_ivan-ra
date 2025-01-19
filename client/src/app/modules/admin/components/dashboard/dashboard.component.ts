import { Component } from '@angular/core';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user: any = null;
  token: any = null;
  role: any = null;
  countActivitiesConfigurations: number | null = null;
  countUser: number | null = null;
  countDeployActivity: number | null = null;
  totalDeployActivity: number = 100;

  constructor(private adminService: AdminService, private snackBar: MatSnackBar){

  }

  ngOnInit(): void {
    this.user = StorageService.getUser();
    this.token = StorageService.getToken();
    this.role = StorageService.getUserRole();
    this.fectCountActivitiesConfigurations();
    this.fectCountUsers();
    this.fetchCountDeployActivity();
  }

  fectCountActivitiesConfigurations(){
    this.adminService.getCountActivitiesConfigurations().subscribe({
      next: (count) => {
        this.countActivitiesConfigurations = count;
      },
      error: (error) => {
        this.snackBar.open("Erro ao carregar a contagem de atividades.", "error", {duration: 5000})
      }
    });
  }

  fectCountUsers(){
    this.adminService.getCountUsers().subscribe({
      next: (count) => {
        this.countUser = count;
      },
      error: (error) => {
        this.snackBar.open("Erro ao carregar a contagem de usuários.", "error", {duration: 5000})
      }
    });
  }

  fetchCountDeployActivity(){
    this.adminService.getCountDeployActivity().subscribe({
      next: (count) => {
        this.countDeployActivity = count;
      },
      error: (error) => {
        this.snackBar.open("Erro ao carregar a contagem de actividades submetidas.", "error", {duration: 5000})
      }
    });
  }

}
