import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from '../../services/admin.service';
import { ItemDeploy } from '../../models/deploy.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-analystics',
  templateUrl: './analystics.component.html',
  styleUrl: './analystics.component.css'
})
export class AnalysticsComponent {

  displayedColumns: string[] = [
    'technicalDescription',
    'username',
    'operationUserEmail',
    'deployStatus',
    'dueDate',
    'doneAt',
    'nota',
    'createdAt',
    'situation',
    'avaliatedAt',
  ];

    dataSource = new MatTableDataSource<ItemDeploy>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
      private adminService: AdminService,
      private snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
      this.loadDeployActidade();
    }

    loadDeployActidade(): void {
      this.adminService.getDeployActivities().subscribe({
        next: (res: ItemDeploy[]) => {
          this.dataSource.data = res;
        },
        error: (err) => {
          this.snackbar.open('Something went wrong', 'Error', { duration: 5000 });
          console.error('Erro ao carregar as configurações de atividades:', err);
        },
      });
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
}
