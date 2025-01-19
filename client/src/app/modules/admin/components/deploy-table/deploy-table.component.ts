import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AdminService } from '../../services/admin.service';
import { ItemDeploy } from '../../models/deploy.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeployEditDialogComponent } from '../deploy-edit-dialog/deploy-edit-dialog.component';


@Component({
  selector: 'app-deploy-table',
  templateUrl: './deploy-table.component.html',
  styleUrl: './deploy-table.component.css'
})
export class DeployTableComponent {

  displayedColumns: string[] = [
    'technicalDescription',
    'activityDeployed',
    'username',
    'operationUserEmail',
    'deployStatus',
    'doneAt',
    'nota',
    'situation',
    'avaliatedAt',
    'createdAt',
    'updatedAt',
    'actions'
  ];

  dataSource = new MatTableDataSource<ItemDeploy>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private snackbar: MatSnackBar
  ) { }

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

  openDeleteDialog(item: ItemDeploy): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItem(item);
      }
    });
  }

  deleteItem(item: ItemDeploy) {
    this.adminService.deleteDeployActivity(item.id).subscribe({
      next: (res) => {
        this.snackbar.open(
          'Deploy activity deleted successfully.',
          'Close',
          { duration: 5000 }
        );
      },
    });
    this.dataSource.data = this.dataSource.data.filter((i) => i.id !== item.id);
  }

  editItem(item: ItemDeploy) {
    const dialogRef = this.dialog.open(DeployEditDialogComponent, {
      width: '800px',
      height: '300px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateItem(result);
      }
    });
  }

  updateItem(updatedItem: ItemDeploy) {
    this.dataSource.data = this.dataSource.data.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
  }
}
