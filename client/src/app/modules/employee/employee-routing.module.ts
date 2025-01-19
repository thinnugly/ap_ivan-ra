import { EmployeeComponent } from './components/employee/employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemTableComponent } from './components/item-table/item-table.component';
import { DeployTableComponent } from './components/deploy-table/deploy-table.component';

const routes: Routes = [
  { path: "", component: EmployeeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configurations', component: ItemTableComponent },
      { path: 'activitiesdeploy', component: DeployTableComponent },
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
