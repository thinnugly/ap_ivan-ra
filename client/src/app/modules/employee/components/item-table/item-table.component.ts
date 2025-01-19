import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Item } from '../../models/item.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import { DeployDialogComponent } from '../deploy-dialog/deploy-dialog.component';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrl: './item-table.component.css'
})
export class ItemTableComponent {

  now: Date = new Date();

  displayedColumns: string[] = ['technicalDescription', 'activityInstructions', 'supportMaterial', 'username', 'operationUserEmail', 'dueDate', 'activityStatus', 'createdAt', 'updatedAt', 'actions'];

  dataSource = new MatTableDataSource<Item>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private employeeService: EmployeeService,
    private snackbar: MatSnackBar) { }


  ngOnInit(): void {
    this.loadActivityConfigs();
    this.employeeService.refreshNeeded$.subscribe(() => {
      this.loadActivityConfigs();
    });
  }

  isButtonDisabled(element: any): boolean {
    return (
      element.activityStatus === 'COMPLETED' ||
      (element.dueDate && this,this.now > new Date(element.dueDate))
    );
  }

  loadActivityConfigs(): void {
    this.employeeService.getActivityConfigs().subscribe({
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

  openCreateActivityDialog(item: Item): void {
    const dialogRef = this.dialog.open(DeployDialogComponent, {
      width: '800px',
      height: '600px',
      data: item
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.loadActivityConfigs();
    //   }
    // });
  }

}
