import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { ItemTableComponent } from './components/item-table/item-table.component';
import { CreateActivityDialogComponent } from './components/create-activity-dialog/create-activity-dialog.component';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditActivityDialogComponent } from './components/edit-activity-dialog/edit-activity-dialog.component';
import { AssignActivityTableComponent } from './components/assign-activity-table/assign-activity-table.component';
import { AssignActivityDialogComponent } from './components/assign-activity-dialog/assign-activity-dialog.component';
import { AssignEditActivityComponent } from './components/assign-edit-activity/assign-edit-activity.component';
import { DeployTableComponent } from './components/deploy-table/deploy-table.component';
import { AnalysticsComponent } from './components/analystics/analystics.component';
import { DeployEditDialogComponent } from './components/deploy-edit-dialog/deploy-edit-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    ItemTableComponent,
    CreateActivityDialogComponent,
    DeleteConfirmationDialogComponent,
    EditActivityDialogComponent,
    AssignActivityTableComponent,
    AssignActivityDialogComponent,
    AssignEditActivityComponent,
    DeployTableComponent,
    AnalysticsComponent,
    DeployEditDialogComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
