import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AssignActivityDialogComponent } from '../assign-activity-dialog/assign-activity-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AdminService } from '../../services/admin.service';
import { ItemAssign } from '../../models/Item_assign';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssignEditActivityComponent } from '../assign-edit-activity/assign-edit-activity.component';


@Component({
  selector: 'app-assign-activity-table',
  templateUrl: './assign-activity-table.component.html',
  styleUrl: './assign-activity-table.component.css'
})
export class AssignActivityTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['technicalDescription', 'username', 'dueDate', 'activityStatus', 'operationUserEmail', 'createdAt', 'updatedAt', 'actions'];

  dataSource = new MatTableDataSource<ItemAssign>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private adminService: AdminService,
    private snackbar: MatSnackBar) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadAssignActivities();
  }

  loadAssignActivities(): void {
    this.adminService.getAssignActivities().subscribe({
      next: (res: ItemAssign[]) => {
        this.dataSource.data = res;
      },
      error: (err) => {
        this.snackbar.open('Something went wrong', 'Error', { duration: 5000 });
        console.error('Erro ao carregar as atividades atribuídas:', err);
      },
    });
  }

  openCreateActivityDialog(): void {
    const dialogRef = this.dialog.open(AssignActivityDialogComponent, {
      width: '800px',
      height: '570px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addItem(result);
      }
    });

  }

  addItem(activity: ItemAssign) {
    this.dataSource.data = [...this.dataSource.data, activity];
  }

  editItem(item: ItemAssign) {

    const dialogRef = this.dialog.open(AssignEditActivityComponent, {
      width: '800px',
      height: '570px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateItem(result);
      }
    });
  }

  updateItem(updatedItem: ItemAssign) {
    this.dataSource.data = this.dataSource.data.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
  }

  openDeleteDialog(item: ItemAssign): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(item);
      }
    });
  }

  deleteItem(item: ItemAssign) {
    this.adminService.deleteAssignActivity(item.id).subscribe({
      next: (res) => {
        this.snackbar.open('Assign activity deleted successfully.', 'Close', { duration: 5000 });
      }
    });
    this.dataSource.data = this.dataSource.data.filter(i => i.id !== item.id);
  }

}
