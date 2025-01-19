import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { MaterialModule } from '../../shared/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ItemTableComponent } from './components/item-table/item-table.component';
import { DeployDialogComponent } from './components/deploy-dialog/deploy-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeployTableComponent } from './components/deploy-table/deploy-table.component';
import { DeployEditDialogComponent } from './components/deploy-edit-dialog/deploy-edit-dialog.component';



@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeComponent,
    ItemTableComponent,
    DeployDialogComponent,
    DeployTableComponent,
    DeployEditDialogComponent,


  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
