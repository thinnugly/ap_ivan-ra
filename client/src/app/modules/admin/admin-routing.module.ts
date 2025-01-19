import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from '../../auth/components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { ItemTableComponent } from './components/item-table/item-table.component';
import { AssignActivityTableComponent } from './components/assign-activity-table/assign-activity-table.component';
import { DeployTableComponent } from './components/deploy-table/deploy-table.component';
import { AnalysticsComponent } from './components/analystics/analystics.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configurations', component: ItemTableComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'assignactivity', component: AssignActivityTableComponent },
      { path: 'activitiesdeploy', component: DeployTableComponent },
      { path: 'analystics', component: AnalysticsComponent },
    ]
  },

];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
