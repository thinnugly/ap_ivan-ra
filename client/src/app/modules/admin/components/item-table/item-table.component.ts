import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreateActivityDialogComponent } from '../create-activity-dialog/create-activity-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AdminService } from '../../services/admin.service';
import { Item } from '../../models/item.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditActivityDialogComponent } from '../edit-activity-dialog/edit-activity-dialog.component';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.css'],
})
export class ItemTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'technicalDescription',
    'activityInstructions',
    'supportMaterial',
    'userEmail',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  dataSource = new MatTableDataSource<Item>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadActivityConfigs();
  }

  loadActivityConfigs(): void {
    this.adminService.getActivityConfigs().subscribe({
      next: (res: Item[]) => {
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

  openCreateActivityDialog(): void {
    const dialogRef = this.dialog.open(CreateActivityDialogComponent, {
      width: '800px',
      height: '590px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addItem(result);
      }
    });
  }

  addItem(activity: Item) {
    this.dataSource.data = [...this.dataSource.data, activity];
  }

  openDeleteDialog(item: Item): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItem(item);
      }
    });
  }

  deleteItem(item: Item) {
    this.adminService.deleteActivityConfig(item.id).subscribe({
      next: (res) => {
        this.snackbar.open(
          'Activity configuration deleted successfully.',
          'Close',
          { duration: 5000 }
        );
      },
    });
    this.dataSource.data = this.dataSource.data.filter((i) => i.id !== item.id);
  }

  editItem(item: Item) {
    const dialogRef = this.dialog.open(EditActivityDialogComponent, {
      width: '800px',
      height: '590px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateItem(result);
      }
    });
  }

  updateItem(updatedItem: Item) {
    this.dataSource.data = this.dataSource.data.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
  }
}
